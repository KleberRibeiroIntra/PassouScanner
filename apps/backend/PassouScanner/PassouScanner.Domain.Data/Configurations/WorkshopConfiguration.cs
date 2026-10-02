using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.Data.Configurations;

public class WorkshopConfiguration : IEntityTypeConfiguration<Workshop>
{
    public void Configure(EntityTypeBuilder<Workshop> builder)
    {
        builder.HasIndex(w => w.NavigationId).IsUnique();
        builder.Property(w => w.Name).HasMaxLength(200);
        builder.Property(w => w.Phone).HasMaxLength(20);
        builder.Property(w => w.Address).HasMaxLength(300);

        builder.HasOne(w => w.User)
            .WithMany(u => u.Workshops)
            .HasForeignKey(w => w.UserId)
            .HasPrincipalKey(u => u.NavigationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
