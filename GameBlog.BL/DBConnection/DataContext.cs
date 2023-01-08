using GameBlog.Domain.Models;
using Microsoft.EntityFrameworkCore;
using GameBlog.Domain.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using GameBlog.Domain;

namespace GameBlog.BL.DBConnection
{
    public class DataContext : IdentityDbContext<User, ApplicationRole, Guid>
    {
        public DataContext(DbContextOptions<DataContext> opts) : base(opts) { }

        public DbSet<Reader> Readers { get; set; }

        public DbSet<Journalist> Journalists { get; set; }

        public DbSet<Admin> Admins { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Topic> Topics { get; set; }

        public DbSet<GamePost> GamePosts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new JournalistConfiguration());
            modelBuilder.ApplyConfiguration(new CommentConfiguration());
        }
    }
}
