using GameBlog.BL.Models;
using GameBlog.BL.Repositories.Abstractions;
using GameBlog.Domain.Constants;
using GameBlog.Domain.Enums;
using GameBlog.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Security.Claims;

namespace GameBlog.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IWebHostEnvironment _env;
        private readonly UserManager<User> _userManager;
        private readonly IEmailSender _emailSender;

        public AuthController(IAuthRepository authRepository, IWebHostEnvironment env, UserManager<User> userManager, IEmailSender emailSender)
        {
            _authRepository = authRepository;
            _env = env;
            _userManager = userManager;
            _emailSender = emailSender;
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

        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel forgotPasswordDto, CancellationToken cancellationToken = default)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
            if (user == null)
                return BadRequest("Invalid Request");
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var param = new Dictionary<string, string?>
                {
                    {"token", token },
                    {"email", forgotPasswordDto.Email }
                };
            var callback = QueryHelpers.AddQueryString(forgotPasswordDto.ClientURI, param);
            var message = new Message(new string[] { user.Email }, "Відновлення паролю", callback);
            _emailSender.SendEmail(message, "Відновлення паролю");

            return Ok();
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel resetPasswordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            if (user == null)
                return BadRequest("Invalid Request");
            var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);
            if (!resetPassResult.Succeeded)
            {
                var errors = resetPassResult.Errors.Select(e => e.Description);
                return BadRequest(new { Errors = errors });
            }
            return Ok();
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
        [HttpGet("avatar/{id:guid}")]
        public async Task<IActionResult> GetAvatarAsync(
            [FromRoute] Guid id,
            CancellationToken token = default
        )
        {
            var img = await _authRepository.GetAvatarAsync(id, token);

            if (img is null)
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
