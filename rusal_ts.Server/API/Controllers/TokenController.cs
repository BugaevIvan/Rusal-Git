using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using rusal.Server.BLL.Services;

namespace rusal_ts.Server.API.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TokenController(TokensService jwtService) : ControllerBase
    {
        [HttpGet]
        public IActionResult CheckToken()
        {
            var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized();
            }
            try
            {
                var response = jwtService.Verify(token);
                return Ok();
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }
        //[HttpPost]
        //public IActionResult RefreshToken()
        //{
        //    var refreshToken = Request.Cookies["refreshToken"];
        //    if (string.IsNullOrEmpty(refreshToken))
        //    {
        //        return Unauthorized();
        //    }

        //    var result = _authService.ValidateRefreshToken(refreshToken);
        //    if (!result.IsValid)
        //    {
        //        return Unauthorized();
        //    }

        //    var newAccessToken = _jwtService.GenerateAccessToken(result.UserId);
        //    var newRefreshToken = _jwtService.GenerateRefreshToken();

        //    // Обновляем Refresh токен в куки
        //    Response.Cookies.Append("refreshToken", newRefreshToken, new CookieOptions
        //    {
        //        HttpOnly = true,
        //        Secure = true,
        //        SameSite = SameSiteMode.Strict,
        //        Expires = DateTime.UtcNow.AddDays(7)
        //    });

        //    return Ok(new { accessToken = newAccessToken });
        //}

    }
}
