using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameBlog.Migrations
{
    /// <inheritdoc />
    public partial class AddImageToTopicModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ImageId",
                table: "Topics",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Topics_ImageId",
                table: "Topics",
                column: "ImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Topics_Images_ImageId",
                table: "Topics",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Topics_Images_ImageId",
                table: "Topics");

            migrationBuilder.DropIndex(
                name: "IX_Topics_ImageId",
                table: "Topics");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Topics");
        }
    }
}
