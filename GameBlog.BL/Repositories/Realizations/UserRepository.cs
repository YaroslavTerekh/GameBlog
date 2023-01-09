using GameBlog.BL.DBConnection;
using GameBlog.BL.Repositories.Abstractions;
using GameBlog.Domain.Enums;
using GameBlog.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.Repositories.Realizations
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task BanUserAsync(Guid userId, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(userId);

            user.IsBanned = true;

            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task ChangeUserRoleAsync(Guid userId, Role role, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(userId);

            user.Role = role;

            if(role == Role.Journalist)
            {
                var existReader = await _context.Readers
                                    .Where(t => t.UserId == userId)                                   
                                    .FirstOrDefaultAsync(cancellationToken);

                var journalist = new Journalist
                {
                    UserId = userId,
                };

                if (!await _context.Journalists.AnyAsync(t => t.UserId == userId))
                {
                    await _context.Journalists.AddAsync(journalist);

                    if (existReader != null)
                    {
                        _context.Readers.Remove(existReader);
                    }
                }
            }

            if(role == Role.User)
            {
                var existJournalist = await _context.Journalists
                                    .Where(t => t.UserId == userId)
                                    .FirstOrDefaultAsync(cancellationToken);

                var reader = new Reader
                {
                    UserId = userId,                    
                };

                if(!await _context.Readers.AnyAsync(t => t.UserId == userId))
                {
                    await _context.Readers.AddAsync(reader);

                    if (existJournalist != null)
                    {
                        _context.Journalists.Remove(existJournalist);
                    }
                }
            }

            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task UnbanUserAsync(Guid userId, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(userId);

            user.IsBanned = false;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
