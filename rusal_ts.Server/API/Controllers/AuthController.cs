using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using rusal.Server.BLL.Interfaces;
using rusal.Server.BLL.Services;
using rusal.Server.Contracts.DTO;
using rusal.Server.DAL.Entities;

namespace rusal.Server.API.Controllers
{
    [EnableCors("AllowSpecificOrigin")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController(IAuthService authService, TokensService jwtService) : Controller
    {
        [HttpOptions]
        public IActionResult Options()
        {
            // Handle the preflight request
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromQuery] UserDto userDto)
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = userDto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password)
            };
            return Created("Success", await authService.CreateUser(user));
        }

        [HttpGet]
        public async Task<IActionResult> Login([FromQuery] UserDto userDto)
        {
            var result = await authService.Login(userDto);

            if (result is OkObjectResult okResult && okResult.Value is LoginResponseDto loginResponseDto)
            {
                var refreshToken = loginResponseDto.Tokens.RefreshToken;

                Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions { HttpOnly = true });

                return new OkObjectResult(new { loginResponseDto.UserId, loginResponseDto.UserName, loginResponseDto.Tokens.AccessToken, });
            }
            else
                return new ObjectResult("User not found or invalid password") { StatusCode = 500 };
        }

        [HttpPost]
        public IActionResult LogOut()
        {
            Response.Cookies.Delete("refreshToken");
            return Ok(new { redirectUrl = "https://localhost:5173/auth" });
        }


        [HttpGet]
        public IActionResult GetUSer()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                {
                    return Unauthorized();
                }
                var token = jwtService.Verify(jwt);
                Guid userId = Guid.Parse(token.Issuer);

                var user = authService.GetCurrnetUsername(userId);

                return new OkObjectResult(user);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex);
            }
        }
    }
}
