using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameBlog.Migrations
{
    /// <inheritdoc />
    public partial class ModifyNotifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notification_GamePosts_PostId",
                table: "Notification");

            migrationBuilder.AlterColumn<Guid>(
                name: "PostId",
                table: "Notification",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_GamePosts_PostId",
                table: "Notification",
                column: "PostId",
                principalTable: "GamePosts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notification_GamePosts_PostId",
                table: "Notification");

            migrationBuilder.AlterColumn<Guid>(
                name: "PostId",
                table: "Notification",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_GamePosts_PostId",
                table: "Notification",
                column: "PostId",
                principalTable: "GamePosts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
