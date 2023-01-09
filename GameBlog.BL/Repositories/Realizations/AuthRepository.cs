using GameBlog.BL.DBConnection;
using GameBlog.BL.Models;
using GameBlog.BL.Repositories.Abstractions;
using GameBlog.Domain.Enums;
using GameBlog.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.Repositories.Realizations
{
    public class AuthRepository : IAuthRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly DataContext _context;

        public AuthRepository(UserManager<User> userManager, SignInManager<User> signInManager, DataContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }

        public async Task LoginUserAsync(LoginModel userCreds, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(t => t.Email == userCreds.Email, cancellationToken);

            var result = _signInManager.CheckPasswordSignInAsync(user, userCreds.Password, false);

            //TODO: Create token
        }

        public async Task RegisterUserAsync(RegisterModel newUser, CancellationToken cancellationToken)
        {
            //TODO: Logic

            var mappedUser = new User
            {
                UserName = String.Concat(newUser.FirstName, newUser.LastName),
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                Email = newUser.Email,
                Role = Role.User
            };

            var result = await _userManager.CreateAsync(mappedUser, newUser.Password);

            if (!result.Succeeded)
            {
                throw new Exception(result.Errors.ToString());
            }
        }
    }
}
