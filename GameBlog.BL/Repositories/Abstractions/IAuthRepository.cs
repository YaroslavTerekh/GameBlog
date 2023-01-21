using GameBlog.BL.Models;
using GameBlog.Domain.Models;
using Microsoft.AspNetCore.Http;

namespace GameBlog.BL.Repositories.Abstractions
{
    public interface IAuthRepository
    {
        public Task UploadAvatarAsync(HttpContext context, string root, string path, Guid CurrentUserId, CancellationToken token);

        public Task<Image> GetAvatarAsync(Guid CurrentUserId, CancellationToken token);

        public Task RegisterUserAsync(RegisterModel newUser, CancellationToken cancellationToken);

        public Task<string> LoginUserAsync(LoginModel userCreds, CancellationToken cancellationToken);

        public Task<User> GetUserInfoAsync(Guid currentUserId, CancellationToken cancellationToken);

        public Task ModifyUserAsync(ModifyUserInfoModel modifyUserInfoModel, CancellationToken cancellationToken);

        public Task AddBiographyAsync(ModifyBio bio, Guid CurrentUserId, CancellationToken cancellationToken);

        public Task SubscribeAsync(Guid id, Guid currentUserId, CancellationToken cancellationToken);

        public Task UnsubscribeAsync(Guid id, Guid currentUserId, CancellationToken cancellationToken);

        public Task<bool> IsSubscribedAsync(Guid id, Guid currentUserId, CancellationToken cancellationToken);
    }
}
