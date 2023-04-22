using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.Seed;

public interface IContextInitializer
{
    public Task Initialize();
}
