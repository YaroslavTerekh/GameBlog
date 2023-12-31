﻿using GameBlog.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.Domain.Models
{
    public class User : IdentityUser<Guid>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string AboutMe { get; set; } = " ";

        public Role Role { get; set; }

        public bool IsBanned { get; set; }

        public List<Comment> Comments { get; set; } = new();

        public Image? Avatar { get; set; }

        public DateTime RegisteredDate { get; set; } = DateTime.UtcNow;

        public List<Notification> ReceivedNotifications { get; set; } = new();

        public List<Notification> SentNotifications { get; set; } = new();
    }
}
