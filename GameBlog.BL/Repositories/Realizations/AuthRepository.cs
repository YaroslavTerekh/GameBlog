using GameBlog.BL.DBConnection;
using GameBlog.BL.Models;
using GameBlog.BL.Repositories.Abstractions;
using GameBlog.BL.Services.Abstractions;
using GameBlog.Domain.Enums;
using GameBlog.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GameBlog.BL.Repositories.Realizations
{
    public class AuthRepository : IAuthRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IAuthService _authService;
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public AuthRepository(
            UserManager<User> userManager, 
            SignInManager<User> signInManager, 
            DataContext context,
            IAuthService authService,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
            _authService = authService;
            _configuration = configuration;
        }

        public async Task<User> GetUserInfoAsync(Guid currentUserId, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(t => t.Id == currentUserId, cancellationToken);

            return user;
        }

        public async Task<string> LoginUserAsync(LoginModel userCreds, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(t => t.Email == userCreds.Email, cancellationToken);

            var result = _signInManager.CheckPasswordSignInAsync(user, userCreds.Password, false);

            if(!result.IsCompleted)
            {
                throw new Exception(result.Exception.Message);
            }

            return _authService.GenerateJWT(user, _configuration);
        }

        public async Task ModifyUserAsync(ModifyUserInfoModel modifyUserInfoModel, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(t => t.Id == modifyUserInfoModel.CurrentUserId, cancellationToken);

            user.FirstName = modifyUserInfoModel.FirstName;
            user.LastName = modifyUserInfoModel.LastName;
            user.Email = modifyUserInfoModel.Email;

            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task RegisterUserAsync(RegisterModel newUser, CancellationToken cancellationToken)
        {
            //TODO: Logic

            var mappedUser = new User
            {
                UserName = newUser.Email.Split('@')[0],
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
