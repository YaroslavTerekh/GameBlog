using GameBlog.BL.Models;
using GameBlog.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.Repositories.Abstractions
{
    public interface INotificationRepository
    {
        public Task<List<Notification>> GetAllNotifications(Guid CurrentUserId, CancellationToken token);

        public Task DeleteNotificationAsync(Guid id, CancellationToken cancellationToken);

        public Task SendToAllUsers(AdminSendNotification model, Guid currentUserId, CancellationToken cancellationToken);        
    }
}
