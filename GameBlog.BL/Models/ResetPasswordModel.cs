﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.Models
{
    public class ResetPasswordModel
    {
        public string? Password { get; set; }
        
        public string? ConfirmPassword { get; set; }

        public string? Email { get; set; }

        public string? Token { get; set; }
    }
}
