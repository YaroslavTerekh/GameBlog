using GameBlog.Domain.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.Services.Abstractions
{
    public interface IAuthService
    {
        public string GenerateJWT(User user, IConfiguration config);
    }
}
