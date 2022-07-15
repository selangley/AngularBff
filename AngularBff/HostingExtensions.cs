using Duende.Bff.Yarp;
using Serilog;

namespace AngularBff
{
    internal static class HostingExtensions
    {
        public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddRazorPages();

            builder.Services.AddControllers();

            // add BFF services and server-side session management
            // https://docs.duendesoftware.com/identityserver/v5/bff/session/management/
            // https://docs.duendesoftware.com/identityserver/v6/bff/options
            builder.Services.AddBff(options =>
                {
                    // Injects Extra checks to make sure the BFF middleware has been added to the pipeline.
                    options.EnforceBffMiddleware = true;
                })
                .AddRemoteApis() // Is this what we want?
                // https://docs.duendesoftware.com/identityserver/v5/bff/session/server_side_sessions/
                .AddServerSideSessions(); // Is this what we want?
            
            // https://docs.duendesoftware.com/identityserver/v5/bff/session/handlers/
            builder.Services.AddAuthentication(options =>
                {
                    options.DefaultScheme = "cookie";
                    options.DefaultChallengeScheme = "oidc";
                    options.DefaultSignOutScheme = "oidc";
                })
                // https://docs.duendesoftware.com/identityserver/v5/bff/session/handlers/#the-cookie-handler
                .AddCookie("cookie", options =>
                {
                    options.Cookie.Name = "__Host-bff";
                    options.Cookie.SameSite = SameSiteMode.Strict;
                })
                // https://docs.duendesoftware.com/identityserver/v5/bff/session/handlers/#the-openid-connect-authentication-handler
                .AddOpenIdConnect("oidc", options =>
                {
                    options.Authority = "https://demo.duendesoftware.com";
                    options.ClientId = "interactive.confidential";
                    options.ClientSecret = "secret";
                    options.ResponseType = "code";
                    options.ResponseMode = "query";

                    options.GetClaimsFromUserInfoEndpoint = true;
                    options.SaveTokens = true;
                    options.MapInboundClaims = false;

                    options.Scope.Clear();
                    options.Scope.Add("openid");
                    options.Scope.Add("profile");
                    options.Scope.Add("api");
                    options.Scope.Add("offline_access");

                    options.TokenValidationParameters.NameClaimType = "name";
                    options.TokenValidationParameters.RoleClaimType = "role";
                });

            return builder.Build();
        }

        public static WebApplication ConfigurePipeline(this WebApplication app)
        {
            app.UseSerilogRequestLogging();

            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseRouting(); // BEFORE or AFTER UseAuthentication() ?

            // Debug Routing, I hope
            // IF app was of type IApplicationBuilder
            
            /*app.Use(next => context =>
            {
                Console.WriteLine($"Found: {context.GetEndPoint()?.DisplayName}");
            });*/
            
            // add CSRF protection and status code handling for API endpoints
            app.UseBff();
            app.UseAuthorization();

            // local API endpoints
            app.MapControllers()
                .RequireAuthorization()
                .AsBffApiEndpoint(); // Adds Anti-forgery protection: https://docs.duendesoftware.com/identityserver/v6/bff/apis/yarp/#anti-forgery-protection

            app.MapBffManagementEndpoints();

            // enable proxying to remote API
            app.MapRemoteBffApiEndpoint("/remote", "https://demo.duendesoftware.com/api/test")
                .RequireAccessToken();

            return app;
        }
    }
}