using System.ComponentModel.DataAnnotations;

namespace rusal.Server.Contracts.DTO
{
    public class UserDto
    {
        [Required]
        public string Username { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}
