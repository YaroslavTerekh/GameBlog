using GameBlog.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.Models
{
    public class NotificationModel
    {
        public Guid Id { get; set; }

        public UserModel Sender { get; set; }

        public UserModel Receiver { get; set; }

        public PostModel Post { get; set; }

        public Subject Subject { get; set; }
    }
}
