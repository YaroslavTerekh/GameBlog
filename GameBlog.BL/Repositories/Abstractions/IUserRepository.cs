using GameBlog.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.Repositories.Abstractions
{
    public interface IUserRepository
    {
        public Task ChangeUserRoleAsync(Guid userId, Role role, CancellationToken cancellationToken);

        public Task BanUserAsync(Guid userId, CancellationToken cancellationToken);

        public Task UnbanUserAsync(Guid userId, CancellationToken cancellationToken);
    }
}
