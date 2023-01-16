using GameBlog.BL.DBConnection;
using GameBlog.BL.Models;
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
    public class NewsRepository : INewsRepository
    {
        private readonly DataContext _context;

        public NewsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddCommentAsync(CreateCommentModel comment, CancellationToken cancellationToken)
        {
            var mappedComment = new Comment
            {
                CommentAuthorId = comment.AuthorUserId,
                CommentText = comment.Description,
                PostId = comment.PostId
            };

            await _context.Comments.AddAsync(mappedComment, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task AddTopicAsync(CreateTopicModel topic, CancellationToken cancellationToken)
        {
            var mappedTopic = new Topic
            {
                Title = topic.Title,
                Description = topic.Description,
                TopicAuthorId = topic.AuthorUserId
            };

            await _context.Topics.AddAsync(mappedTopic, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task CreateNewsAsync(CreatePostModel newPost, CancellationToken cancellationToken = default)
        {
            var journalistId = await _context.Journalists
                                    .Where(t => t.UserId == newPost.UserId)
                                    .Select(t => t.Id)
                                    .FirstOrDefaultAsync(cancellationToken);

            var mappedPost = new GamePost
            {
                Title = newPost.Title,
                Description = newPost.Description,
                JournalistId = journalistId,
                TopicId = newPost.TopicId
            };

            await _context.GamePosts.AddAsync(mappedPost, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<List<Journalist>> GetAllJournalistsAsync(CancellationToken cancellationToken)
        {
            var journalists = await _context.Journalists
                .Include(t => t.User)
                .Include(t => t.Posts.Take(10))
                .ToListAsync(cancellationToken);

            return journalists;
        }

        public async Task<List<GamePost>> GetAllNewsAsync(CancellationToken cancellationToken)
        {
            //TODO: Add mapper

            return await _context.GamePosts
                .AsNoTracking()
                .Include(t => t.Journalist)
                    .ThenInclude(t => t.User)
                .Include(t => t.Topic)
                .Include(t => t.Comments)
                    .ThenInclude(t => t.CommentAuthor)
                .ToListAsync(cancellationToken);
        }

        public async Task<List<Topic>> GetAllTopicsAsync(CancellationToken cancellationToken)
        {
            return await _context.Topics
                .Include(t => t.TopicAuthor)
                .ToListAsync(cancellationToken);
        }

        public async Task<List<GamePost>> GetMinePostsAsync(Guid currentUserId, CancellationToken cancellationToken)
        {
            var journalistId = await _context.Journalists
                .Where(t => t.UserId == currentUserId)
                .Select(t => t.Id)
                .FirstOrDefaultAsync(cancellationToken);

            var userPosts = await _context.GamePosts
                .Where(t => t.JournalistId == journalistId)
                .ToListAsync(cancellationToken);

            return userPosts;
        }

        public async Task<List<Journalist>> GetPopularJournalistsAsync(CancellationToken cancellationToken)
        {
            var journalists = await _context.Journalists
                    .Include(t => t.User)
                    .Include(t => t.Posts)
                    .OrderByDescending(t => t.Posts.Count)
                    .Take(6)
                    .ToListAsync(cancellationToken);

            return journalists;
        }

        public async Task<List<GamePost>> GetPopularPostsAsync(CancellationToken cancellationToken)
        {
            return await _context.GamePosts
                .Where(t => t.CreatedTime > DateTime.UtcNow.AddDays(-3))
                .ToListAsync(cancellationToken);                 
        }

        public async Task<GamePost> GetSpecifiedNewsAsync(Guid postId, CancellationToken cancellationToken)
        {
            return await _context.GamePosts
                .AsNoTracking()
                .Include(t => t.Journalist)
                .Include(t => t.Topic)
                .FirstOrDefaultAsync(t => t.Id == postId, cancellationToken);
        }

        public async Task<List<GamePost>> GetTopicPostsAsync(Guid topicId, CancellationToken cancellationToken)
        {
            return await _context.GamePosts
                .AsNoTracking()
                .Where(t => t.TopicId == topicId)
                .Include(t => t.Journalist)
                .Include(t => t.Topic)
                .ToListAsync(cancellationToken);
        }
    }
}
