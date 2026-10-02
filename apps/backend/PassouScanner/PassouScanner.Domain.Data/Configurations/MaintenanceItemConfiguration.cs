using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.Data.Configurations;

public class MaintenanceItemConfiguration : IEntityTypeConfiguration<MaintenanceItem>
{
    public void Configure(EntityTypeBuilder<MaintenanceItem> builder)
    {
        builder.HasIndex(i => i.NavigationId).IsUnique();
        builder.Property(i => i.PartBrand).HasMaxLength(100);
        builder.Property(i => i.Position).HasMaxLength(50);
        builder.Property(i => i.Quantity).HasDefaultValue(1);

        builder.HasOne(i => i.Maintenance)
            .WithMany(m => m.Items)
            .HasForeignKey(i => i.MaintenanceId)
            .HasPrincipalKey(m => m.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(i => i.Part)
            .WithMany(p => p.MaintenanceItems)
            .HasForeignKey(i => i.PartId)
            .HasPrincipalKey(p => p.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
