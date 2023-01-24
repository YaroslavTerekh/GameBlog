using GameBlog.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.Services.Abstractions
{
    public interface INotificationsService
    {
        public Task<Guid> AddNotification(Notification notification, CancellationToken cancellationToken);

        public Task SendNotification(Notification notification, CancellationToken cancellationToken);
    }
}
