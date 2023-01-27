using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameBlog.Migrations
{
    /// <inheritdoc />
    public partial class AddYouTubeLinkEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "YouTubeLinks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    YouTubeUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GamePostId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_YouTubeLinks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_YouTubeLinks_GamePosts_GamePostId",
                        column: x => x.GamePostId,
                        principalTable: "GamePosts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_YouTubeLinks_GamePostId",
                table: "YouTubeLinks",
                column: "GamePostId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "YouTubeLinks");
        }
    }
}
