using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameBlog.Migrations
{
    /// <inheritdoc />
    public partial class AddImageToPost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ImageId",
                table: "GamePosts",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GamePosts_ImageId",
                table: "GamePosts",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_GamePosts_Images_ImageId",
                table: "GamePosts",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GamePosts_Images_ImageId",
                table: "GamePosts");

            migrationBuilder.DropIndex(
                name: "IX_GamePosts_ImageId",
                table: "GamePosts");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "GamePosts");
        }
    }
}
