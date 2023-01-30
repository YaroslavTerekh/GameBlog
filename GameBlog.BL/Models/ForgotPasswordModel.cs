using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.Models
{
    public class ForgotPasswordModel
    {
        public string? Email { get; set; }

        public string? ClientURI { get; set; }
    }
}
