using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.Data.Configurations;

public class PartConfiguration : IEntityTypeConfiguration<Part>
{
    public void Configure(EntityTypeBuilder<Part> builder)
    {
        builder.HasIndex(p => p.NavigationId).IsUnique();
        builder.Property(p => p.Name).HasMaxLength(200);

        builder.HasOne(p => p.VehicleType)
            .WithMany(v => v.Parts)
            .HasForeignKey(p => p.VehicleTypeId)
            .HasPrincipalKey(v => v.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
