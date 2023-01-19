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

        [HttpGet]
        public async Task<IActionResult> GetAllUsersAsync(
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _userRepository.GetAllUsersAsync(cancellationToken));
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

        [HttpPatch("ban/{id:guid}")]
        public async Task<IActionResult> BanUserAsync(
            [FromRoute] Guid id,
            CancellationToken cancellationToken = default
        )
        {
            await _userRepository.BanUserAsync(id, cancellationToken);

            return NoContent();
        }


        [HttpPatch("unban/{id:guid}")]
        public async Task<IActionResult> UnbanUserAsync(
            [FromRoute] Guid id,
            CancellationToken cancellationToken = default
        )
        {
            await _userRepository.UnbanUserAsync(id, cancellationToken);

            return NoContent();
        }

        [HttpGet("for-charts")]
        public async Task<IActionResult> GetUsersForChartsAsync(
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _userRepository.GetUsersForChart(cancellationToken));
        }
    }
}
