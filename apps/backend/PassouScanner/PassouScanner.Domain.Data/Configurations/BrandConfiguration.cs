using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.Data.Configurations;

public class BrandConfiguration : IEntityTypeConfiguration<Brand>
{
    public void Configure(EntityTypeBuilder<Brand> builder)
    {
        builder.HasIndex(b => b.NavigationId).IsUnique();
        builder.HasIndex(b => new { b.VehicleTypeId, b.Name }).IsUnique();
        builder.Property(b => b.Name).HasMaxLength(100);

        builder.HasOne(b => b.VehicleType)
            .WithMany(v => v.Brands)
            .HasForeignKey(b => b.VehicleTypeId)
            .HasPrincipalKey(v => v.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
