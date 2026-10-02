using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.Data.Configurations;

public class VehicleMileageConfiguration : IEntityTypeConfiguration<VehicleMileage>
{
    public void Configure(EntityTypeBuilder<VehicleMileage> builder)
    {
        builder.HasIndex(m => m.NavigationId).IsUnique();
        builder.HasIndex(m => new { m.VehicleId, m.Date });

        builder.HasOne(m => m.Vehicle)
            .WithMany(v => v.Mileages)
            .HasForeignKey(m => m.VehicleId)
            .HasPrincipalKey(v => v.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
