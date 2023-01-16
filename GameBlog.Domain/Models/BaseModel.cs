using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.Domain.Models
{
    public class BaseModel
    {
        public Guid Id { get; set; }

        public DateTime CreatedTime { get; set; }

        public BaseModel()
        {
            Id = Guid.NewGuid();
            CreatedTime = DateTime.UtcNow;
        }
    }
}
