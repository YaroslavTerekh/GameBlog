using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.Domain.Models
{
    public class Journalist : User
    {
        public List<GamePost> Posts { get; set; } = new();
    }
}
