using GameBlog.BL.DBConnection;
using GameBlog.BL.Models;
using GameBlog.BL.Repositories.Abstractions;
using GameBlog.BL.Services.Abstractions;
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
    public class NotificationRepository : INotificationRepository
    {
        private readonly DataContext _context;
        private readonly INotificationsService _notificationsService;

        public NotificationRepository(DataContext context, INotificationsService notificationsService)
        {
            _context = context;
            _notificationsService = notificationsService;
        }

        public async Task DeleteNotificationAsync(Guid id, CancellationToken cancellationToken)
        {
            var notification = await _context.Notification.FirstOrDefaultAsync(t => t.Id == id, cancellationToken);

            _context.Remove(notification);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<List<Notification>> GetAllNotifications(Guid CurrentUserId, CancellationToken token)
        {
            var notifications = await _context.Notification
                .Include(t => t.Sender)
                .Include(t => t.Receiver)
                .Include(t => t.Post)
                .Where(t => t.ReceiverId == CurrentUserId)
                .AsNoTracking()
                .ToListAsync(token);

            return notifications;
        }

        public async Task SendToAllUsers(AdminSendNotification model, Guid currentUserId, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(t => t.Id == currentUserId, cancellationToken);

            var allUsers = await _context.Users.Where(t => t.Role != Role.Admin).ToListAsync(cancellationToken);

            var notifications = new List<Notification>();

            foreach(var userToReceive in allUsers)
            {
                var notification = new Notification
                {
                    Sender = user,
                    Receiver = userToReceive,
                    Subject = Subject.ToAllUsers,
                };

                notifications.Add(notification);
                await _notificationsService.AddNotification(notification, cancellationToken);
            }

            await _context.SaveChangesAsync(cancellationToken);
            
            foreach (var not in notifications)
            {
                await _notificationsService.SendNotification(not, cancellationToken);
            }
        }
    }
}
