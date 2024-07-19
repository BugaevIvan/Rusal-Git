using rusal_ts.Server.BLL.Interfaces;
using System.IdentityModel.Tokens.Jwt;

namespace rusal_ts.Server.BLL.MiddleWares
{
    public class TokenRefreshMiddleware
    {
        private readonly RequestDelegate _next;

        public TokenRefreshMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, ITokensService tokenService)
        {
            var authHeader = context.Request.Headers["Authorization"].ToString();
            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            {
                var accessToken = authHeader.Substring("Bearer ".Length).Trim();
                var tokenHandler = new JwtSecurityTokenHandler();

                if (tokenHandler.CanReadToken(accessToken))
                {
                    var jwtToken = tokenHandler.ReadJwtToken(accessToken);
                    var expiry = jwtToken.ValidTo;
                    if (expiry < DateTime.UtcNow)
                    {
                        var refreshToken = context.Request.Cookies["refreshToken"];
                        if (!string.IsNullOrEmpty(refreshToken) && tokenService.ValidateRefreshToken(refreshToken))
                        {
                            var newAccessToken = tokenService.GenerateAccessToken(Guid.Parse(jwtToken.Issuer));
                            context.Response.Headers["Authorization"] = "Bearer " + newAccessToken;
                            //context.Response.Headers.Add("New-Authorization", "Bearer " + newAccessToken);
                        }
                    }
                }
            }
            await _next(context);
        }
    }

}
