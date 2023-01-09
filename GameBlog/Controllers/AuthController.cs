using GameBlog.BL.Models;
using GameBlog.BL.Repositories.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GameBlog.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
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

            return Ok(token);
        }
    }
}
