using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.Domain.Models
{
    public class Comment : BaseModel
    {
        public Reader CommentAuthor { get; set; }

        public Guid CommentAuthorId { get; set; }

        public GamePost Post { get; set; }

        public Guid PostId { get; set; }

        public string CommentText { get; set; }
    }
}
