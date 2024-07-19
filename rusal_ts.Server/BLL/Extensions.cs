using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using rusal.Server.BLL.Interfaces;
using rusal.Server.BLL.Services;
using rusal_ts.Server.BLL.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace rusal.Server.BLL
{
    public static class Extensions
    {
        public static IServiceCollection AddServices(this IServiceCollection service)
        {
            return service.AddAuthServices().AddTokensServices();
        }

        public static void AddApiAuthentication(this IServiceCollection service, IConfiguration configuration)
        {
            var jwtOptions = configuration.GetSection(nameof(JwtOptions)).Get<JwtOptions>();

            service.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new()
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions!.AccessSecretKey)),
                        ClockSkew = TimeSpan.Zero
                    };
                    options.Events = new JwtBearerEvents()
                    {
                        OnMessageReceived = context =>
                        {
                            var authHeader = context.Request.Headers["Authorization"].ToString();
                            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                            {
                                var token = authHeader.Substring("Bearer ".Length).Trim();
                                if (!string.IsNullOrEmpty(token) && token.Contains('.') && token != "null")
                                {
                                    context.Token = token;
                                }
                                else
                                {
                                    context.NoResult();
                                    return Task.CompletedTask;
                                }
                            }

                            return Task.CompletedTask;
                        },
                        OnAuthenticationFailed = context =>
                        {
                            // Логирование ошибки аутентификации
                            Console.WriteLine($"Authentication failed: {context.Exception.Message}");
                            return Task.CompletedTask;
                        },
                        OnTokenValidated = context =>
                        {
                            // Логирование успешной валидации токена
                            //var jwtToken = context.SecurityToken as JwtSecurityToken;
                            if (DateTime.UtcNow < context.SecurityToken.ValidTo)
                            {
                                Console.WriteLine($"Token valid. Expiration: {context.SecurityToken.ValidTo}");
                            }
                            else
                            {
                                Console.WriteLine("Token valid, but unable to cast to JwtSecurityToken.");
                            }
                            return Task.CompletedTask;
                        }
                    };
                });
            service.AddAuthorization();
        }

        private static IServiceCollection AddAuthServices(this IServiceCollection service)
        {
            service.TryAddScoped<IAuthService, AuthService>();
            return service;
        }
        private static IServiceCollection AddTokensServices(this IServiceCollection service)
        {
            service.TryAddScoped<ITokensService, TokensService>();
            service.TryAddScoped<TokensService>();
            return service;
        }
    }
}
