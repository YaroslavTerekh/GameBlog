using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.Domain.Models
{
    public class Journalist : BaseModel
    {
        public User User { get; set; }

        public Guid UserId { get; set; }

        public List<Reader> Subscribers { get; set; }

        public List<GamePost> Posts { get; set; } = new();
    }
}
