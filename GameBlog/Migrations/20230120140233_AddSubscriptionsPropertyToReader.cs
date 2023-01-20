using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameBlog.Migrations
{
    /// <inheritdoc />
    public partial class AddSubscriptionsPropertyToReader : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "JournalistId",
                table: "Readers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Readers_JournalistId",
                table: "Readers",
                column: "JournalistId");

            migrationBuilder.AddForeignKey(
                name: "FK_Readers_Journalists_JournalistId",
                table: "Readers",
                column: "JournalistId",
                principalTable: "Journalists",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Readers_Journalists_JournalistId",
                table: "Readers");

            migrationBuilder.DropIndex(
                name: "IX_Readers_JournalistId",
                table: "Readers");

            migrationBuilder.DropColumn(
                name: "JournalistId",
                table: "Readers");
        }
    }
}
