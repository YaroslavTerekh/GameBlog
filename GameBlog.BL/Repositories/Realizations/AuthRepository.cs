using GameBlog.BL.DBConnection;
using GameBlog.BL.Models;
using GameBlog.BL.Repositories.Abstractions;
using GameBlog.BL.Services.Abstractions;
using GameBlog.Domain.Enums;
using GameBlog.Domain.Models;
using Microsoft.AspNetCore.Http;
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

        public async Task AddBiographyAsync(ModifyBio bio, Guid CurrentUserId, CancellationToken cancellationToken)
        {
            var journalist = await _context.Journalists
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.UserId == CurrentUserId, cancellationToken);

            journalist.User.AboutMe = bio.Bio;
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<Image> GetAvatarAsync(Guid CurrentUserId, CancellationToken token)
        {
            var userImg = await _context.Users
                .Include(t => t.Avatar)
                .FirstOrDefaultAsync(t => t.Id == CurrentUserId, token);

            return userImg.Avatar;
        }

        public async Task<User> GetUserInfoAsync(Guid currentUserId, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(t => t.Id == currentUserId, cancellationToken);

            return user;
        }

        public async Task<string> LoginUserAsync(LoginModel userCreds, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(t => t.Email == userCreds.Email, cancellationToken);

            if(user is null)
            {
                throw new Exception("Користувача не знайдено");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, userCreds.Password, false);

            if(!result.Succeeded)
            {
                throw new Exception("Пароль неправильний");
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
                Email = newUser.Email
            };

            mappedUser.Role = newUser.Role switch
            {
                Role.User => Role.User,
                Role.Journalist => Role.Journalist,
                Role.Admin => Role.User,
                _ => Role.User
            };

            var result = await _userManager.CreateAsync(mappedUser, newUser.Password);

            if (!result.Succeeded)
            {
                throw new Exception("Користувач з таким email уже присутній, або ви неправильно вказали пароль");
            }

            var newRoleUser = newUser.Role switch
            {
                Role.User => new Reader { 
                    UserId = mappedUser.Id
                },                
                Role.Admin => new Reader {
                    UserId = mappedUser.Id
                },
                _ => new Reader {
                    UserId = mappedUser.Id
                }
            };
            
            if(newRoleUser is not null)
            {
                await _context.Readers.AddAsync(newRoleUser, cancellationToken);
            }

            if (newUser.Role == Role.Journalist)
            {
                var newRoleUser1 = new Journalist
                {
                    UserId = mappedUser.Id,
                };

                if (newRoleUser1 is not null)
                {
                    await _context.Journalists.AddAsync(newRoleUser1, cancellationToken);
                }
            }

            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task SubscribeAsync(Guid id, Guid currentUserId, CancellationToken cancellationToken)
        {
            var journalist = await _context.Journalists
                .Include(t => t.Subscribers)
                .FirstOrDefaultAsync(t => t.Id == id, cancellationToken);

            var reader = await _context.Readers
                .FirstOrDefaultAsync(t => t.UserId == currentUserId, cancellationToken);

            if(journalist is null || reader is null)
            {
                throw new Exception();
            }

            if (!journalist.Subscribers.Contains(reader))
            {
                journalist.Subscribers.Add(reader);
                await _context.SaveChangesAsync(cancellationToken);
            }             
        }

        public async Task UnsubscribeAsync(Guid id, Guid currentUserId, CancellationToken cancellationToken)
        {
            var journalist = await _context.Journalists
                .Include(t => t.Subscribers)
                .FirstOrDefaultAsync(t => t.Id == id, cancellationToken);

            var reader = await _context.Readers
                .FirstOrDefaultAsync(t => t.UserId == currentUserId, cancellationToken);

            if (journalist is null || reader is null)
            {
                throw new Exception();
            }

            if(journalist.Subscribers.Contains(reader))
            {
                journalist.Subscribers.Remove(reader);
                await _context.SaveChangesAsync(cancellationToken);
            } else
            {
                throw new Exception();
            }
            
        }

        public async Task<bool> IsSubscribedAsync(Guid id, Guid currentUserId, CancellationToken cancellationToken)
        {
            var journalist = await _context.Journalists
                .Include(t => t.Subscribers)
                .FirstOrDefaultAsync(t => t.Id == id, cancellationToken);

            var reader = await _context.Readers
                .FirstOrDefaultAsync(t => t.UserId == currentUserId, cancellationToken);

            return journalist.Subscribers.Contains(reader);
        }

        public async Task UploadAvatarAsync(HttpContext context, string root, string path, Guid CurrentUserId, CancellationToken token)
        {
            var file = context.Request.Form.Files[0];

            var fileName = Path.GetFileName(file.FileName);
            var filePathName = DateTime.Now.Millisecond + fileName;
            var uploadPath = Path.Combine("", root, path, filePathName);

            var image = new Image
            {
                Path = uploadPath,
            };

            if (file is not null)
            {
                try
                {
                    using var memoryStream = new MemoryStream();
                    await file.CopyToAsync(memoryStream, token);
                    await File.WriteAllBytesAsync(uploadPath, memoryStream.ToArray(), token);

                    await _context.AddAsync(image, token);
                    await _context.SaveChangesAsync(token);

                    var user = await _context.Users.FirstOrDefaultAsync(t => t.Id == CurrentUserId);
                    user.Avatar = image;

                    await _context.SaveChangesAsync(token);
                }
                catch (Exception) 
                { 
                    if(Directory.Exists(uploadPath))
                    {
                        File.Delete(uploadPath);
                    }
                }
            }
        }
    }
}
