using GameBlog.BL.Models;
using GameBlog.BL.Repositories.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GameBlog.Controllers
{
    [AllowAnonymous]
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;

        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
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
    }
}
