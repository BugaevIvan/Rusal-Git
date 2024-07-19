using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace rusal.Server.DAL.Entities
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Username { get; set; } = null!;

        [Required]
        [JsonIgnore]
        public string PasswordHash { get; set; } = null!;
    }
}
