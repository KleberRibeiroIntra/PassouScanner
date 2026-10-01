using Microsoft.EntityFrameworkCore;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.Data;

public class PassouScannerDbContext : DbContext
{
    public PassouScannerDbContext(DbContextOptions<PassouScannerDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        RegisterAllEntities(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(PassouScannerDbContext).Assembly);
    }

    private void RegisterAllEntities(ModelBuilder modelBuilder)
    {
        var domainAssembly = typeof(BaseEntity).Assembly;

        var entities = domainAssembly.GetTypes()
            .Where(type => type.IsClass && !type.IsAbstract && typeof(BaseEntity).IsAssignableFrom(type));

        foreach (var entity in entities)
        {
            modelBuilder.Entity(entity);
        }
    }
}
