using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.Domain.Models
{
    public class Topic : BaseModel
    {
        public User TopicAuthor { get; set; }

        public Guid TopicAuthorId { get; set; }

        public Image? Image { get; set; }

        public Guid? ImageId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }
    }
}
