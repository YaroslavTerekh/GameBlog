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
    public class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.HasOne(t => t.CommentAuthor)
                .WithMany(t => t.Comments)
                .HasForeignKey(t => t.CommentAuthorId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
