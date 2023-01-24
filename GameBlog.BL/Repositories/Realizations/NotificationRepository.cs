using GameBlog.BL.DBConnection;
using GameBlog.BL.Repositories.Abstractions;
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

        public NotificationRepository(DataContext context)
        {
            _context = context;
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
    }
}
