using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.Domain.Models
{
    public class Reader : User
    {
        public List<Comment> Comments { get; set; } = new();
    }
}
