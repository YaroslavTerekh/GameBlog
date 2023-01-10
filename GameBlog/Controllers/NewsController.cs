using GameBlog.BL.Models;
using GameBlog.BL.Repositories.Abstractions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GameBlog.Controllers
{
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

        [HttpGet]
        public async Task<IActionResult> GetAllPostsAsync(
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _newsController.GetAllNewsAsync(cancellationToken));
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetPostAsync(
            [FromRoute] Guid id,
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _newsController.GetSpecifiedNewsAsync(id, cancellationToken));
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
    }
}
