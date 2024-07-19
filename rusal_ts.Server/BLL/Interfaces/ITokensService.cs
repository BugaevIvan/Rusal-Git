using Microsoft.AspNetCore.Mvc;
using rusal.Server.BLL.Services;

namespace rusal_ts.Server.BLL.Interfaces
{
    public class ValidateRefreshTokenResult
    {
        public bool IsValid { get; set; }
        public string UserId { get; set; }
    }
    public interface ITokensService
    {
        Tokens GenerateTokens(Guid userId);
        string GenerateAccessToken(Guid userId);
        string GenerateRefreshToken(Guid userId);
        bool ValidateRefreshToken(string refreshToken);
    }
}
