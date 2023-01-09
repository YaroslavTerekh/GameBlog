using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace GameBlog.BL.Models
{
    public class CreateTopicModel
    {
        [JsonIgnore]
        public Guid AuthorUserId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }
    }
}
