using GameBlog.BL.DBConnection;
using GameBlog.BL.Repositories.Abstractions;
using GameBlog.Domain.Enums;
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
