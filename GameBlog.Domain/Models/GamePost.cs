using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.Domain.Models
{
    public class GamePost : BaseModel
    {
        public Journalist Journalist { get; set; }

        public Guid JournalistId { get; set; }

        public Topic Topic { get; set; }

        public Guid TopicId { get; set; }

        public List<Comment> Comments { get; set; }

        public Image? Image { get; set; }

        public Guid? ImageId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public List<YouTubeLink> YouTubeUrls { get; set; }
    }
}
