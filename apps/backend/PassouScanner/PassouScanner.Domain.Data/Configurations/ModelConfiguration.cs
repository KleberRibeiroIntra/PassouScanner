using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.Data.Configurations;

public class ModelConfiguration : IEntityTypeConfiguration<Model>
{
    public void Configure(EntityTypeBuilder<Model> builder)
    {
        builder.HasIndex(m => m.NavigationId).IsUnique();
        builder.HasIndex(m => new { m.BrandId, m.Name, m.Version }).IsUnique();
        builder.Property(m => m.Name).HasMaxLength(100);
        builder.Property(m => m.Version).HasMaxLength(100);

        builder.HasOne(m => m.Brand)
            .WithMany(b => b.Models)
            .HasForeignKey(m => m.BrandId)
            .HasPrincipalKey(b => b.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
