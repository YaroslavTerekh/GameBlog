using GameBlog.BL.DataTransferObjects;
using GameBlog.BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.Repositories.Abstractions
{
    public interface IAuthRepository
    {
        public Task RegisterUserAsync(RegisterModel newUser, CancellationToken cancellationToken);

        public Task<string> LoginUserAsync(LoginModel userCreds, CancellationToken cancellationToken);
    }
}
