using GameBlog.BL.Models;
using GameBlog.BL.Repositories.Abstractions;
using GameBlog.Domain.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GameBlog.Controllers
{
    //[AllowAnonymous]
    [Route("api/posts")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsRepository _newsController;

        public NewsController(INewsRepository newsController)
        {
            _newsController = newsController;
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewPostAsync(
            [FromBody] CreatePostModel model, 
            CancellationToken cancellationToken = default)
        {
            model.UserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            await _newsController.CreateNewsAsync(model, cancellationToken);

            return NoContent();
        }

        [Authorize(policy: Policies.Admin)]
        [HttpGet]
        public async Task<IActionResult> GetAllPostsAsync(
            CancellationToken cancellationToken = default
        )
        {
            var posts = await _newsController.GetAllNewsAsync(cancellationToken);

            return Ok(posts);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetPostAsync(
            [FromRoute] Guid id,
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _newsController.GetSpecifiedNewsAsync(id, cancellationToken));
        }

        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularPostsAsync(
            CancellationToken cancellationToken
        )
        {
            return Ok(await _newsController.GetPopularPostsAsync(cancellationToken));
        }

        [HttpPost("comment")]
        public async Task<IActionResult> AddCommentAsync(
            CreateCommentModel model,
            CancellationToken cancellationToken = default
        )
        {
            model.AuthorUserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            await _newsController.AddCommentAsync(model, cancellationToken);

            return NoContent();
        }

        [HttpPost("topic")]
        public async Task<IActionResult> AddTopicAsync(
            CreateTopicModel model,
            CancellationToken cancellationToken = default
        )
        {
            model.AuthorUserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            await _newsController.AddTopicAsync(model, cancellationToken);

            return NoContent();
        }

        [HttpGet("topics")]
        public async Task<IActionResult> GetAllTopicsAsync(
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _newsController.GetAllTopicsAsync(cancellationToken));
        }

        [HttpGet("topic/{id:guid}/posts")]
        public async Task<IActionResult> GetAllTopicsAsync(
            [FromRoute] Guid id,
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _newsController.GetTopicPostsAsync(id, cancellationToken));
        }

        [HttpGet("journalists/all")]
        public async Task<IActionResult> GetAllJournalistsAsync(
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _newsController.GetAllJournalistsAsync(cancellationToken));
        }

        [HttpGet("journalists/popular")]
        public async Task<IActionResult> GetPopularJournalistsAsync(
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _newsController.GetPopularJournalistsAsync(cancellationToken));
        }

        [HttpGet("mine")]
        public async Task<IActionResult> GetMinePostsAsync(
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _newsController.GetMinePostsAsync(Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), cancellationToken));
        }
    }
}
