using GameBlog.BL.Models;
using GameBlog.Domain.Models;

namespace GameBlog.BL.Repositories.Abstractions
{
    public interface INewsRepository
    {
        public Task CreateNewsAsync(CreatePostModel newPost, CancellationToken cancellationToken);

        public Task<List<GamePost>> GetAllNewsAsync(CancellationToken cancellationToken);

        public Task AddCommentAsync(CreateCommentModel comment, CancellationToken cancellationToken);

        public Task AddTopicAsync(CreateTopicModel topic, CancellationToken cancellationToken);

        public Task<GamePost> GetSpecifiedNewsAsync(Guid postId, CancellationToken cancellationToken);

        public Task<List<Topic>> GetAllTopicsAsync(CancellationToken cancellationToken);

        public Task<List<GamePost>> GetTopicPostsAsync(Guid topicId, CancellationToken cancellationToken);
    }
}
