using GameBlog.BL.DBConnection;
using GameBlog.Domain.Enums;
using GameBlog.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.Seed;

public class ContextInitializer : IContextInitializer
{
    private readonly DataContext _context;

    public ContextInitializer(
        DataContext context
    )
    {
        _context = context;
    }

    public async Task Initialize()
    {
        if (!await _context.Users.Where(t => t.Role == Role.Admin).AnyAsync())
        {
            var user = new User
            {
                UserName = "Адміністратор",
                NormalizedUserName = "АДМІНІСТРАТОР",
                Email = "admin@gmail.com",
                NormalizedEmail = "ADMIN@GMAIL.COM",
                EmailConfirmed = false,
                FirstName = "Адміністратор",
                LastName = "Адміністратор",
                Role = Role.Admin,
                IsBanned = false,
                PasswordHash = "AQAAAAEAACcQAAAAEGQASuS3hPfrbBqNG7JyBfRnwVmDL+mzx+iv/wBzb0dYbFLAhY+yqKV6ttQI0pQbSw==",
                SecurityStamp = "DSWUMKSZ6S55Q7VYEIC5DNZECQKBTW4T",
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
    }
}
