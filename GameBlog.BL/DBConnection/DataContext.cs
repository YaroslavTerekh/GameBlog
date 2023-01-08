using GameBlog.Domain.Models;
using Microsoft.EntityFrameworkCore;
using GameBlog.Domain.Configuration;

namespace GameBlog.BL.DBConnection
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> opts) : base(opts) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Reader> Readers { get; set; }

        public DbSet<Journalist> Journalists { get; set; }

        public DbSet<Admin> Admins { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Topic> Topics { get; set; }

        public DbSet<GamePost> GamePosts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new JournalistConfiguration());
            modelBuilder.ApplyConfiguration(new CommentConfiguration());
        }
    }
}
