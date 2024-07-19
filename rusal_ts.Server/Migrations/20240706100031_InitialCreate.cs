using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace rusal.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Passes",
                columns: table => new
                {
                    PassId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    DateApply = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Number = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Type = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TypePeriod = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Organization = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Comment = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Datefrom = table.Column<DateOnly>(type: "date", nullable: false),
                    Dateto = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Passes", x => x.PassId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Username = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PasswordHash = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Passes",
                columns: new[] { "PassId", "Comment", "DateApply", "Datefrom", "Dateto", "Number", "Organization", "Status", "Type", "TypePeriod" },
                values: new object[,]
                {
                    { new Guid("0950b1d9-c6d2-497f-90ba-beae5e4c638f"), "Awesome #1", new DateTime(2023, 12, 29, 0, 22, 50, 0, DateTimeKind.Unspecified), new DateOnly(2023, 12, 29), new DateOnly(2023, 12, 30), "2023-12-5", "Sony", "Приостановлен", "Постоянный", "Разовый" },
                    { new Guid("1695ec69-b0f3-4589-beaa-e926ed14bb0a"), "Супер", new DateTime(2023, 12, 28, 21, 11, 42, 0, DateTimeKind.Unspecified), new DateOnly(2023, 12, 8), new DateOnly(2023, 12, 17), "2023-12-2", "РУСАЛ #2", "Просрочен", "Временный", "Разовый" },
                    { new Guid("61fc2af2-66ad-4231-b25b-781bd096a2a7"), "Best", new DateTime(2023, 12, 28, 22, 25, 55, 0, DateTimeKind.Unspecified), new DateOnly(2023, 12, 30), new DateOnly(2023, 12, 31), "2023-12-4", "Apple", "Изъят", "Разовый", "Разовый" },
                    { new Guid("70c6a0f2-29c5-4e67-ba38-b96bb276f665"), "Ура #1", new DateTime(2023, 12, 28, 21, 10, 55, 0, DateTimeKind.Unspecified), new DateOnly(2023, 12, 4), new DateOnly(2023, 12, 8), "2023-12-1", "СФУ", "Действителен", "Постоянный", "Разовый" },
                    { new Guid("9416d93b-71f5-4ca0-9a45-5b2de24e1a93"), "ТОП №1", new DateTime(2023, 12, 28, 22, 23, 38, 0, DateTimeKind.Unspecified), new DateOnly(2023, 12, 30), new DateOnly(2023, 12, 31), "2023-12-3", "Хабр + StackOverFlow", "Приостановлен", "Временный", "Разовый" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "PasswordHash", "Username" },
                values: new object[] { new Guid("d369af29-7615-4962-8623-206f3db0457b"), "202cb962ac59075b964b07152d234b70", "admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Passes");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
