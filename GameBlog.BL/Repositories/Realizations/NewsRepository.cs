using GameBlog.BL.DBConnection;
using GameBlog.BL.Models;
using GameBlog.BL.Repositories.Abstractions;
using GameBlog.Domain.Enums;
using GameBlog.Domain.Models;
using Microsoft.AspNetCore.Http;
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

        public async Task CreateNewsAsync(CreatePostModel newPost, Guid imgId, CancellationToken cancellationToken = default)
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
                TopicId = newPost.TopicId,
                ImageId = imgId
            };

            await _context.GamePosts.AddAsync(mappedPost, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<List<Journalist>> GetAllJournalistsAsync(CancellationToken cancellationToken)
        {
            var journalists = await _context.Journalists
                .Include(t => t.User)
                    .ThenInclude(t => t.Avatar)
                .ToListAsync(cancellationToken);

            return journalists;
        }

        public async Task<List<GamePost>> GetAllNewsAsync(CancellationToken cancellationToken)
        {
            return await _context.GamePosts
                .AsNoTracking()
                .Include(t => t.Journalist)
                    .ThenInclude(t => t.User)
                    .ThenInclude(t => t.Avatar)
                .Include(t => t.Topic)
                .Include(t => t.Comments)
                    .ThenInclude(t => t.CommentAuthor)
                .Include(t => t.Image)
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
                .Include(t => t.Image)
                .ToListAsync(cancellationToken);

            return userPosts;
        }

        public async Task<List<Journalist>> GetPopularJournalistsAsync(CancellationToken cancellationToken)
        {
            var journalists = await _context.Journalists
                    .Include(t => t.User)
                        .ThenInclude(t => t.Avatar)
                    .OrderByDescending(t => t.Posts.Count)
                    .ToListAsync(cancellationToken);

            return journalists;
        }

        public async Task<List<GamePost>> GetPopularPostsAsync(CancellationToken cancellationToken)
        {
            return await _context.GamePosts
                .Include(t => t.Image)
                .Where(t => t.CreatedTime > DateTime.UtcNow.AddDays(-3))
                .ToListAsync(cancellationToken);                 
        }

        public async Task<GamePost> GetSpecifiedNewsAsync(Guid postId, CancellationToken cancellationToken)
        {
            var post = await _context.GamePosts
                .AsNoTracking()
                .Include(t => t.Journalist)
                    .ThenInclude(t => t.User)
                .Include(t => t.Topic)
                .Include(t => t.Image)
                .Include(t => t.Comments)
                    .ThenInclude(t => t.CommentAuthor)
                .FirstOrDefaultAsync(t => t.Id == postId, cancellationToken);

            return post;
        }

        public async Task<List<GamePost>> GetTopicPostsAsync(Guid topicId, CancellationToken cancellationToken)
        {
            return await _context.GamePosts
                .AsNoTracking()
                .Where(t => t.TopicId == topicId)
                .Include(t => t.Journalist)
                .Include(t => t.Topic)
                .Include(t => t.Image)
                .ToListAsync(cancellationToken);
        }

        public async Task<Guid> AddImageAsync(HttpContext context, string root, string path, CancellationToken token = default)
        {
            var file = context.Request.Form.Files[0];

            var fileName = Path.GetFileName(file.FileName);
            var filePathName = DateTime.Now.Millisecond + fileName;
            var uploadPath = Path.Combine("", root, path, filePathName);

            var image = new Image
            {
                Path = uploadPath,
            };

            if (file is not null)
            {
                try
                {
                    using var memoryStream = new MemoryStream();
                    await file.CopyToAsync(memoryStream, token);
                    await File.WriteAllBytesAsync(uploadPath, memoryStream.ToArray(), token);

                    await _context.AddAsync(image, token);
                    await _context.SaveChangesAsync(token);
                }
                catch (Exception) { }                
            }

            return image.Id;
        }

        public async Task<Image> GetImageAsync(Guid id, CancellationToken token = default)
        {
            var file = await _context.Images
                .FirstOrDefaultAsync(t => t.Id == id, token);

            return file;
        }

        public async Task<List<GamePost>> GetPostsWithMyComments(Guid currentUserId, CancellationToken token = default)
        {
            var allPosts = await _context.GamePosts
                .Include(t => t.Comments)
                .Include(t => t.Image)
                .ToListAsync(token);

            var posts = allPosts
                .Where(t => t.Comments.Select(t => t.CommentAuthorId).ToList().Contains(currentUserId))
                .ToList();

            return posts;
        }

        public async Task DeletePostAsync(Guid postId, Guid CurrentUserId, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(t => t.Id == CurrentUserId);

            var post = await _context.GamePosts
                .Include(t => t.Journalist)
                .FirstOrDefaultAsync(t => t.Id == postId, cancellationToken);

            if(user.Role == Role.Admin || post.Journalist.UserId == CurrentUserId)
            {
                _context.GamePosts.Remove(post);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
