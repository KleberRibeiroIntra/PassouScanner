using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PassouScanner.Domain.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddMaintenanceItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddUniqueConstraint(
                name: "AK_Part_NavigationId",
                table: "Part",
                column: "NavigationId");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Maintenance_NavigationId",
                table: "Maintenance",
                column: "NavigationId");

            migrationBuilder.CreateTable(
                name: "MaintenanceItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PartBrand = table.Column<string>(type: "TEXT", maxLength: 100, nullable: true),
                    Position = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false, defaultValue: 1),
                    Price = table.Column<decimal>(type: "TEXT", nullable: true),
                    MaintenanceId = table.Column<Guid>(type: "TEXT", nullable: false),
                    PartId = table.Column<Guid>(type: "TEXT", nullable: false),
                    NavigationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UpdatedBy = table.Column<Guid>(type: "TEXT", nullable: true),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintenanceItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MaintenanceItem_Maintenance_MaintenanceId",
                        column: x => x.MaintenanceId,
                        principalTable: "Maintenance",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MaintenanceItem_Part_PartId",
                        column: x => x.PartId,
                        principalTable: "Part",
                        principalColumn: "NavigationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MaintenanceItem_MaintenanceId",
                table: "MaintenanceItem",
                column: "MaintenanceId");

            migrationBuilder.CreateIndex(
                name: "IX_MaintenanceItem_NavigationId",
                table: "MaintenanceItem",
                column: "NavigationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MaintenanceItem_PartId",
                table: "MaintenanceItem",
                column: "PartId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MaintenanceItem");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Part_NavigationId",
                table: "Part");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Maintenance_NavigationId",
                table: "Maintenance");
        }
    }
}
