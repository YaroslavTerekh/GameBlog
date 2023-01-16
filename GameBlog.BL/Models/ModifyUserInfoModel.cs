using System.Text.Json.Serialization;

namespace GameBlog.BL.Models
{
    public class ModifyUserInfoModel
    {
        [JsonIgnore]
        public Guid CurrentUserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

    }
}
