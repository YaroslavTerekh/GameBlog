using GameBlog.BL.Models;
using GameBlog.Domain.Models;
using Microsoft.AspNetCore.Http;

namespace GameBlog.BL.Repositories.Abstractions
{
    public interface INewsRepository
    {
        public Task CreateNewsAsync(CreatePostModel newPost, Guid imgId, CancellationToken cancellationToken);

        public Task<List<GamePost>> GetAllNewsAsync(CancellationToken cancellationToken);

        public Task AddCommentAsync(CreateCommentModel comment, CancellationToken cancellationToken);

        public Task AddTopicAsync(CreateTopicModel topic, CancellationToken cancellationToken);

        public Task<GamePost> GetSpecifiedNewsAsync(Guid postId, CancellationToken cancellationToken);

        public Task<List<Topic>> GetAllTopicsAsync(CancellationToken cancellationToken);

        public Task<List<GamePost>> GetTopicPostsAsync(Guid topicId, CancellationToken cancellationToken);

        public Task<List<Journalist>> GetAllJournalistsAsync(CancellationToken cancellationToken);

        public Task<List<GamePost>> GetMinePostsAsync(Guid currentUserId, CancellationToken cancellationToken);

        public Task<List<Journalist>> GetPopularJournalistsAsync(CancellationToken cancellationToken);

        public Task<List<GamePost>> GetPopularPostsAsync(CancellationToken cancellationToken);

        public Task<Guid> AddImageAsync(HttpContext context, string root, string path, CancellationToken token);

        public Task<Image> GetImageAsync(Guid id, CancellationToken token);
    }
}
