using GameBlog.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.Domain.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasMany(t => t.SentNotifications)
                .WithOne(t => t.Sender)
                .HasForeignKey(t => t.SenderId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(t => t.ReceivedNotifications)
                .WithOne(t => t.Receiver)
                .HasForeignKey(t => t.ReceiverId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
