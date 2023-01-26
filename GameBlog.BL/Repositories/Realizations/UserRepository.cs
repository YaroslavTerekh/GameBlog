using GameBlog.BL.DBConnection;
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
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly INotificationsService _notificationsService;

        public UserRepository(DataContext context, INotificationsService notificationsService)
        {
            _context = context;
            _notificationsService = notificationsService;
        }

        public async Task BanUserAsync(Guid userId, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(userId);

            var notification = new Notification
            {
                Receiver = user,
                ReceiverId = user.Id,
                Sender = new User
                {
                    FirstName = "Адміністратор",
                    LastName = " "
                },
                Subject = Subject.YouAreBanned
            };

            await _notificationsService.SendNotification(notification, cancellationToken);

            user.IsBanned = true;

            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task ChangeUserRoleAsync(Guid userId, Role role, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(userId);

            user.Role = role;

            if(role == Role.Journalist)
            {
                var existReader = await _context.Readers
                                    .Where(t => t.UserId == userId)                                   
                                    .FirstOrDefaultAsync(cancellationToken);

                var journalist = new Journalist
                {
                    UserId = userId,
                };

                if (!await _context.Journalists.AnyAsync(t => t.UserId == userId))
                {
                    await _context.Journalists.AddAsync(journalist);

                    if (existReader != null)
                    {
                        _context.Readers.Remove(existReader);
                    }
                }
            }

            if(role == Role.User)
            {
                var existJournalist = await _context.Journalists
                                    .Where(t => t.UserId == userId)
                                    .FirstOrDefaultAsync(cancellationToken);

                var reader = new Reader
                {
                    UserId = userId,                    
                };

                if(!await _context.Readers.AnyAsync(t => t.UserId == userId))
                {
                    await _context.Readers.AddAsync(reader);

                    if (existJournalist != null)
                    {
                        _context.Journalists.Remove(existJournalist);
                    }
                }
            }

            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<List<User>> GetAllUsersAsync(CancellationToken cancellationToken)
        {
            return await _context.Users
                .Where(t => t.Role != Role.Admin)
                .ToListAsync(cancellationToken);
        }

        public async Task<object> GetUsersForChart(CancellationToken cancellationToken)
        {
            var last7DaysUsers = await _context.Users
                .Where(t => t.RegisteredDate > DateTime.UtcNow.AddDays(-7))
                .ToListAsync(cancellationToken);

            var result = new
            {
                day7 = last7DaysUsers.Where(u => u.RegisteredDate.Day == DateTime.UtcNow.Day).ToList(),
                day6 = last7DaysUsers.Where(u => u.RegisteredDate.Day == DateTime.UtcNow.AddDays(-1).Day).ToList(),
                day5 = last7DaysUsers.Where(u => u.RegisteredDate.Day == DateTime.UtcNow.AddDays(-2).Day).ToList(),
                day4 = last7DaysUsers.Where(u => u.RegisteredDate.Day == DateTime.UtcNow.AddDays(-3).Day).ToList(),
                day3 = last7DaysUsers.Where(u => u.RegisteredDate.Day == DateTime.UtcNow.AddDays(-4).Day).ToList(),
                day2 = last7DaysUsers.Where(u => u.RegisteredDate.Day == DateTime.UtcNow.AddDays(-5).Day).ToList(),
                day1 = last7DaysUsers.Where(u => u.RegisteredDate.Day == DateTime.UtcNow.AddDays(-6).Day).ToList(),
            };

            return result;
        }

        public async Task UnbanUserAsync(Guid userId, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(userId);

            var notification = new Notification
            {
                Receiver = user,
                ReceiverId = user.Id,
                Sender = new User
                {
                    FirstName = "Адміністратор",
                    LastName = " "
                },
                Subject = Subject.YouAreUnBanned    
            };       

            user.IsBanned = false;

            await _context.SaveChangesAsync(cancellationToken);
            await _notificationsService.SendNotification(notification, cancellationToken);
        }
    }
}
