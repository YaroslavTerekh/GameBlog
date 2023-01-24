using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.SHub
{
    public class UserIdProvider : IUserIdProvider
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public UserIdProvider(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        public string? GetUserId(HubConnectionContext connection)
        {
            return _contextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value.ToString();
        }
    }
}
