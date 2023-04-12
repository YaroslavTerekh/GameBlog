using GameBlog.BL.Repositories.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GameBlog.Controllers
{
    [Authorize]
    [Route("api/notifications")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationRepository _notificationRepository;

        public NotificationsController(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllNotificationAsync(CancellationToken cancellationToken = default)
        {
            return Ok(await _notificationRepository.GetAllNotifications(Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), cancellationToken));
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteNotificationAsync(Guid id, CancellationToken cancellationToken = default)
        {
            await _notificationRepository.DeleteNotificationAsync(id, cancellationToken);

            return NoContent();
        }

        [HttpGet("count-new")]
        public async Task<IActionResult> CountNewNotificationAsync(CancellationToken cancellationToken = default)
        {
            return Ok(await _notificationRepository.CountNewNotifications(Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), cancellationToken));
        }

        [HttpPatch("read-all")]
        public async Task<IActionResult> ReadAllAsync(CancellationToken cancellationToken = default)
        {
            await _notificationRepository.ReadAllNotifications(Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), cancellationToken);

            return Ok();
        }
    }
}
