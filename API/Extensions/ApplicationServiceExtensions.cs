using System.Collections.Generic;
using API.Constants;
using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            /*
                Fix error: Access to XMLHttpRequest at 'http://localhost:5000/api/activities'
                from origin 'http://localhost:3000' has been blocked by CORS policy:
                No 'Access-Control-Allow-Origin' header is present on the requested resource

                *Note*: dont forget to use this line: app.UseCors("CorsPolicy");
            */

            services.AddCors(opt =>
            {
                opt.AddPolicy(ConfigConstants.CORS_POLICY, policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins(ConfigConstants.LOCALHOST_3000);
                });
            });

            services.AddMediatR(typeof(List.Handler));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }
    }
}