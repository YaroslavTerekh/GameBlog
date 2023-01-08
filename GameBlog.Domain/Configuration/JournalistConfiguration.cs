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
    public class JournalistConfiguration : IEntityTypeConfiguration<Journalist>
    {
        public void Configure(EntityTypeBuilder<Journalist> builder)
        {
            builder.HasMany(t => t.Posts)
                .WithOne(t => t.Journalist)
                .HasForeignKey(t => t.JournalistId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
