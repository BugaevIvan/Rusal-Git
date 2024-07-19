using Microsoft.AspNetCore.Mvc;
using rusal.Server.Contracts.DTO;
using rusal.Server.DAL.Entities;

namespace rusal.Server.BLL.Interfaces
{
    public interface IAuthService
    {
        Task<IActionResult> CreateUser(User user);
        Task<IActionResult> Login(UserDto userDto);
        string GetCurrnetUsername(Guid id);
    }
}
