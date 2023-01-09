using GameBlog.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.DataTransferObjects
{
    public class GamePostDTO
    {
        public Journalist Journalist { get; set; }

        public Guid JournalistId { get; set; }

        public Topic Topic { get; set; }

        public Guid TopicId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }
    }
}
