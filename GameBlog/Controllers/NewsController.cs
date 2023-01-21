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
        private readonly INewsRepository _newsRepository;
        private readonly IWebHostEnvironment _env;

        public NewsController(INewsRepository newsController, IWebHostEnvironment env)
        {
            _newsRepository = newsController;
            _env = env;
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeletePostAsync(
            [FromRoute] Guid id,
            CancellationToken cancellationToken = default
        ) 
        {
            await _newsRepository.DeletePostAsync(id, Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), cancellationToken);

            return NoContent();
        }

        [HttpPost("{imageId:guid}")]
        public async Task<IActionResult> CreateNewPostAsync(
            [FromBody] CreatePostModel model,
            [FromRoute] Guid imageId,
            CancellationToken cancellationToken = default)
        {
            model.UserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            await _newsRepository.CreateNewsAsync(model, imageId, cancellationToken);

            return NoContent();
        }
        [HttpGet]
        public async Task<IActionResult> GetAllPostsAsync(
            CancellationToken cancellationToken = default
        )
        {
            var posts = await _newsRepository.GetAllNewsAsync(cancellationToken);

            return Ok(posts);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetPostAsync(
            [FromRoute] Guid id,
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _newsRepository.GetSpecifiedNewsAsync(id, cancellationToken));
        }

        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularPostsAsync(
            CancellationToken cancellationToken
        )
        {
            return Ok(await _newsRepository.GetPopularPostsAsync(cancellationToken));
        }

        [HttpPost("comment")]
        public async Task<IActionResult> AddCommentAsync(
            CreateCommentModel model,
            CancellationToken cancellationToken = default
        )
        {
            model.AuthorUserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            await _newsRepository.AddCommentAsync(model, cancellationToken);

            return NoContent();
        }

        [HttpPost("topic")]
        public async Task<IActionResult> AddTopicAsync(
            CreateTopicModel model,
            CancellationToken cancellationToken = default
        )
        {
            model.AuthorUserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            await _newsRepository.AddTopicAsync(model, cancellationToken);

            return NoContent();
        }

        [HttpGet("topics")]
        public async Task<IActionResult> GetAllTopicsAsync(
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _newsRepository.GetAllTopicsAsync(cancellationToken));
        }

        [HttpGet("topic/{id:guid}/posts")]
        public async Task<IActionResult> GetAllTopicsAsync(
            [FromRoute] Guid id,
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _newsRepository.GetTopicPostsAsync(id, cancellationToken));
        }

        [HttpGet("journalists/all")]
        public async Task<IActionResult> GetAllJournalistsAsync(
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _newsRepository.GetAllJournalistsAsync(cancellationToken));
        }

        [HttpGet("journalists/popular")]
        public async Task<IActionResult> GetPopularJournalistsAsync(
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _newsRepository.GetPopularJournalistsAsync(cancellationToken));
        }

        [HttpGet("mine")]
        public async Task<IActionResult> GetMinePostsAsync(
            CancellationToken cancellationToken = default
        )
        {
            return Ok(await _newsRepository.GetMinePostsAsync(Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), cancellationToken));
        }

        [HttpPost("add/image")]
        public async Task<IActionResult> AddImage(IFormFile file, CancellationToken token = default)
        {
            var imgId = await _newsRepository.AddImageAsync(HttpContext, _env.ContentRootPath, "uploads", token);

            return Ok(imgId);
        }

        [HttpGet("image/{id:guid}")]
        public async Task<IActionResult> GetImage(
            [FromRoute] Guid id, 
            CancellationToken token = default
        )
        {
            var image = await _newsRepository.GetImageAsync(id, token);

            return PhysicalFile(image.Path, "image/png");
        }

        [HttpGet("mycomments")]
        public async Task<IActionResult> GetMyCommentsAsync(CancellationToken token = default)
        {
            return Ok(await _newsRepository.GetPostsWithMyComments(Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value), token));
        }
    }
}
