using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rusal.Server.BLL.Interfaces;
using rusal.Server.Contracts.DTO;
using rusal.Server.DAL.Entities;
using System.Security.Cryptography;
using System.Text;

namespace rusal.Server.BLL.Services
{
    public class LoginResponseDto
    {
        public LoginResponseDto(Tokens tokens, string userName, Guid userId)
        {
            Tokens = tokens;
            UserId = userId;
            UserName = userName;
        }
        public Tokens Tokens { get; set; }
        public string UserName { get; set; }
        public Guid UserId { get; set; }
    }
    public class AuthService(AppDbContext context, IMapper mapper, TokensService jwtService) : IAuthService
    {
        public async Task<IActionResult> CreateUser(User user)
        {
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
            return new OkObjectResult("User successfully created!");
        }
        public async Task<IActionResult> Login(UserDto userDto)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Username == userDto.Username);

            if (user == null)
                return new UnauthorizedObjectResult("User not found.");

            if (!BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash))
                return new UnauthorizedObjectResult("Invalid password.");

            var tokens = jwtService.GenerateTokens(user.Id);

            return new OkObjectResult(new LoginResponseDto(tokens, userDto.Username, user.Id));
        }

        public string GetCurrnetUsername(Guid id)
        {
            var user = context.Users.FirstOrDefault(u => u.Id == id);
            return user!.Username;
        }

    }
}
