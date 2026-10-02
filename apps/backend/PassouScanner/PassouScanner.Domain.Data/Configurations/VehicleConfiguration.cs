using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.Data.Configurations;

public class VehicleConfiguration : IEntityTypeConfiguration<Vehicle>
{
    public void Configure(EntityTypeBuilder<Vehicle> builder)
    {
        builder.HasIndex(v => v.NavigationId).IsUnique();
        builder.HasIndex(v => v.Plate);
        builder.Property(v => v.Plate).HasMaxLength(7);
        builder.Property(v => v.Color).HasMaxLength(50);

        builder.HasOne(v => v.User)
            .WithMany(u => u.Vehicles)
            .HasForeignKey(v => v.UserId)
            .HasPrincipalKey(u => u.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(v => v.Model)
            .WithMany(m => m.Vehicles)
            .HasForeignKey(v => v.ModelId)
            .HasPrincipalKey(m => m.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
