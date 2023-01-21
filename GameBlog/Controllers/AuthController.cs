using GameBlog.BL.Models;
using GameBlog.BL.Repositories.Abstractions;
using GameBlog.Domain.Constants;
using GameBlog.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GameBlog.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IWebHostEnvironment _env;

        public AuthController(IAuthRepository authRepository, IWebHostEnvironment env)
        {
            _authRepository = authRepository;
            _env = env;
        }

        [Authorize]
        [HttpPost("subscribe/{id:guid}")]
        public async Task<IActionResult> SubscribeAsync(
            [FromRoute] Guid id,
            CancellationToken cancellationToken = default
        )
        {
            await _authRepository.SubscribeAsync(id, Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), cancellationToken);

            return NoContent();
        }

        [Authorize]
        [HttpPost("unsubscribe/{id:guid}")]
        public async Task<IActionResult> UnsubscribeAsync(
            [FromRoute] Guid id,
            CancellationToken cancellationToken = default
        )
        {
            await _authRepository.UnsubscribeAsync(id, Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), cancellationToken);

            return NoContent();
        }

        [Authorize]
        [HttpPost("issubs/{id:guid}")]
        public async Task<IActionResult> IsSubscribedAsync(
            [FromRoute] Guid id,
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _authRepository.IsSubscribedAsync(id, Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), cancellationToken));
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUserAsync(
            RegisterModel registerModel,
            CancellationToken cancellationToken = default
        )
        {
            await _authRepository.RegisterUserAsync(registerModel, cancellationToken);

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUserAsync(
            LoginModel loginModel,
            CancellationToken cancellationToken = default
        )
        {
            var token = await _authRepository.LoginUserAsync(loginModel, cancellationToken);

            return Ok(new { token });
        }

        [Authorize]
        [HttpPost("avatar")]
        public async Task<IActionResult> UploadAvatarAsync(
            IFormFile file,
            CancellationToken token = default
        )
        {
            await _authRepository.UploadAvatarAsync(HttpContext, _env.ContentRootPath, "uploads", Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), token);

            return NoContent();
        }

        [Authorize]
        [HttpGet("avatar")]
        public async Task<IActionResult> GetAvatarAsync(
            CancellationToken token = default
        )
        {
            var img = await _authRepository.GetAvatarAsync(Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), token);

            if(img is null)
            {
                return NoContent();
            }

            return PhysicalFile(img.Path, "image/png");
        }

        [Authorize]
        [HttpGet("user/info")]
        public async Task<IActionResult> GetUserInfoAsync(
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _authRepository.GetUserInfoAsync(Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), cancellationToken));
        }

        [Authorize]
        [HttpPut("user/info")]
        public async Task<IActionResult> ModifyUserInfoAsync(
            ModifyUserInfoModel modifyUserInfoModel,
            CancellationToken cancellationToken = default
        )
        {
            modifyUserInfoModel.CurrentUserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            await _authRepository.ModifyUserAsync(modifyUserInfoModel, cancellationToken);

            return Ok();
        }

        [Authorize(Policy = Policies.Journalists)]
        [HttpPatch("bio")]
        public async Task<IActionResult> AddBioToUserAsync(
            ModifyBio bio,
            CancellationToken cancellationToken = default
        )
        {
            await _authRepository.AddBiographyAsync(bio, Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), cancellationToken);

            return NoContent();
        }
    }
}
