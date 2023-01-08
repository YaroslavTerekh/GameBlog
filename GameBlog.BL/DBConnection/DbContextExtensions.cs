using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GameBlog.BL.DBConnection
{
    public static class DbContextExtensions
    {
        public static IServiceCollection AddDbContextsCustom(this IServiceCollection services, IConfiguration builder)
        {
            services.AddDbContext<DataContext>(
                o => o.UseSqlServer(builder.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("GameBlog")));
            return services;
        }
    }
}
