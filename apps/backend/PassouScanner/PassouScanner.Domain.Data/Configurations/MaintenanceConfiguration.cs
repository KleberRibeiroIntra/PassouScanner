using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.Data.Configurations;

public class MaintenanceConfiguration : IEntityTypeConfiguration<Maintenance>
{
    public void Configure(EntityTypeBuilder<Maintenance> builder)
    {
        builder.HasIndex(m => m.NavigationId).IsUnique();
        builder.HasIndex(m => new { m.VehicleId, m.Date });
        builder.Property(m => m.Description).HasMaxLength(500);

        builder.HasOne(m => m.Vehicle)
            .WithMany(v => v.Maintenances)
            .HasForeignKey(m => m.VehicleId)
            .HasPrincipalKey(v => v.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(m => m.Workshop)
            .WithMany(w => w.Maintenances)
            .HasForeignKey(m => m.WorkshopId)
            .HasPrincipalKey(w => w.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
