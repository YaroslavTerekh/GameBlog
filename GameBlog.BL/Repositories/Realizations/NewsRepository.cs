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

        public async Task<GamePost> GetSpecifiedNewsAsync(Guid postId, CancellationToken cancellationToken)
        {
            return await _context.GamePosts
                .AsNoTracking()
                .Include(t => t.Journalist)
                .Include(t => t.Topic)
                .FirstOrDefaultAsync(t => t.Id == postId, cancellationToken);
        }
    }
}
