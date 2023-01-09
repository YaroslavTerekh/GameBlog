using GameBlog.BL.Repositories.Abstractions;
using GameBlog.Domain.Constants;
using GameBlog.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GameBlog.Controllers
{
    [Authorize(Policy = Policies.Admin)]
    [Route("api/admin/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPatch("role")]
        public async Task<IActionResult> ChangeUserRoleAsync(
            Guid userId,
            Role role,
            CancellationToken cancellationToken = default
        )
        {
            await _userRepository.ChangeUserRoleAsync(userId, role, cancellationToken);

            return NoContent();
        }

        [HttpPatch("ban/{userId:guid}")]
        public async Task<IActionResult> BanUserAsync(
            [FromRoute]Guid userId,
            CancellationToken cancellationToken = default
        )
        {
            await _userRepository.BanUserAsync(userId, cancellationToken);

            return NoContent();
        }


        [HttpPatch("unban/{userId:guid}")]
        public async Task<IActionResult> UnbanUserAsync(
            [FromRoute]Guid userId,
            CancellationToken cancellationToken = default
        )
        {
            await _userRepository.UnbanUserAsync(userId, cancellationToken);

            return NoContent();
        }
    }
}
