using GameBlog.BL.DBConnection;
using GameBlog.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly DataContext _context;

        public TestController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> AddTopicAsync()
        {
            var top = new Topic
            {
                Title = "Mock1",
                Description = "Mock1",
                TopicAuthorId = Guid.Parse("b87728e7-0cdc-4f3d-bec6-9c0194014482")
            };

            await _context.Topics.AddAsync(top);

            await _context.SaveChangesAsync();

            return top.Id;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<Topic>> GetAllTopics(Guid id)
        {
            return await _context.Topics.Include(t => t.TopicAuthor).FirstOrDefaultAsync(t => t.Id == id);
        }
    }
}
