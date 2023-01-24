using GameBlog.BL.DBConnection;
using GameBlog.BL.Models;
using GameBlog.BL.Services.Abstractions;
using GameBlog.BL.SHub;
using GameBlog.Domain.Models;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.Services.Realizations
{
    public class NotificationsService : INotificationsService
    {
        private readonly DataContext _context;
        private readonly IHubContext<NotificationsHub> _hubContext;

        public NotificationsService(DataContext context, IHubContext<NotificationsHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        public async Task SendNotification(Notification notification, CancellationToken cancellationToken = default)
        {
            var notificationMap = new NotificationModel
            {
                Receiver = new UserModel
                {
                    FirstName = notification.Receiver.FirstName,
                    LastName = notification.Receiver.LastName
                },
                Sender = new UserModel
                {
                    FirstName = notification.Sender.FirstName,
                    LastName = notification.Sender.LastName
                },
                Post = new PostModel
                {
                    Title = notification.Post.Title
                }
            };

            await _hubContext.Clients.User(notification.ReceiverId.ToString()).SendAsync(notification.Subject.ToString(), notificationMap);
        }

        public async Task<Guid> AddNotification(Notification notification, CancellationToken cancellationToken = default)
        {
            await _context.Notification.AddAsync(notification, cancellationToken);

            return notification.Id;
        }        
    }
}
