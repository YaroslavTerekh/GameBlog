using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameBlog.Migrations
{
    /// <inheritdoc />
    public partial class AddCommentsToUserModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Readers_CommentAuthorId",
                table: "Comments");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_AspNetUsers_CommentAuthorId",
                table: "Comments",
                column: "CommentAuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_AspNetUsers_CommentAuthorId",
                table: "Comments");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Readers_CommentAuthorId",
                table: "Comments",
                column: "CommentAuthorId",
                principalTable: "Readers",
                principalColumn: "Id");
        }
    }
}
