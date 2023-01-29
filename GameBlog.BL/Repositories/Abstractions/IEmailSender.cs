using GameBlog.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.Repositories.Abstractions
{
    public interface IEmailSender
    {
        void SendEmail(Message message, string name);
    }
}
