using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using rusal_ts.Server.BLL.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace rusal.Server.BLL.Services
{
    public class JwtOptions
    {
        public string AccessSecretKey { get; set; } = string.Empty;
        public string RefreshSecretKey { get; set; } = string.Empty;
        public string AccessExpireMinutes { get; set; } = string.Empty;
        public int RefreshExpireDays { get; set; }
    }

    public class Tokens
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
    }
    public class TokensService(IOptions<JwtOptions> options) : ITokensService
    {
        private readonly JwtOptions _options = options.Value;
        public Tokens GenerateTokens(Guid userId)
        {
            var accessToken = GenerateAccessToken(userId);
            var refreshToken = GenerateRefreshToken(userId);
            return new Tokens { AccessToken = accessToken, RefreshToken = refreshToken };
        }
        public string GenerateAccessToken(Guid userId)
        {
            //Claim[] claims = [new("userId", id.ToString())];
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.AccessSecretKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var header = new JwtHeader(credentials);
            var payload = new JwtPayload(userId.ToString(), null, null, DateTime.UtcNow, DateTime.UtcNow.AddMinutes(2));
            //var payload = new JwtPayload(userId.ToString(), null, null, DateTime.UtcNow, DateTime.UtcNow.AddMinutes(Convert.ToDouble(_options.AccessExpireMinutes)));
            var date1 = DateTime.Now;
            var date2 = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_options.AccessExpireMinutes));
            //var date2 = DateTime.Now.AddMinutes(1);
            //var date3 = DateTime.UtcNow;
            //var date4 = DateTime.UtcNow.AddMinutes(1);
            //var payload = new JwtPayload(id.ToString(), null, null, null, DateTime.UtcNow.AddHours(_options.ExpiresHours));
            var securityToken = new JwtSecurityToken(header, payload);
            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        public string GenerateRefreshToken(Guid userId)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.RefreshSecretKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var header = new JwtHeader(credentials);
            var payload = new JwtPayload(userId.ToString(), null, null, DateTime.UtcNow, DateTime.UtcNow.AddDays(Convert.ToDouble(_options.RefreshExpireDays)));
            var securityToken = new JwtSecurityToken(header, payload);
            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        public bool ValidateRefreshToken(string refreshToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            if (tokenHandler.CanReadToken(refreshToken))
            {
                var jwtToken = tokenHandler.ReadJwtToken(refreshToken);
                var expiry = jwtToken.ValidTo;
                if (expiry < DateTime.UtcNow) 
                    return false;
                return true;
            }
            return false;
        }

        public JwtSecurityToken Verify(string jwt)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_options.AccessSecretKey);
                tokenHandler.ValidateToken(jwt, new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                }, out SecurityToken validatedToken);
                return (JwtSecurityToken)validatedToken;
            }
            catch (SecurityTokenExpiredException)
            {
                Console.WriteLine("Token has expired.");
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Token validation failed: {ex.Message}");
                throw;
            }
        }
    }
}
