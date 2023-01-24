using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.Models
{
    public class NotificationModel
    {
        public UserModel Sender { get; set; }

        public UserModel Receiver { get; set; }

        public PostModel Post { get; set; }
    }
}
