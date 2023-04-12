using GameBlog.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.Domain.Models
{
    public class Notification : BaseModel
    {
        public Subject Subject { get; set; }

        public Guid ReceiverId { get; set; }

        public User Receiver { get; set; }

        public Guid SenderId { get; set; }

        public User Sender { get; set; }

        public GamePost? Post { get; set; }

        public Guid? PostId { get; set; }

        public string? Message { get; set; }

        public bool IsRead { get; set; }
    }
}
