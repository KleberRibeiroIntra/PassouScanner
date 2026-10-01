using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PassouScanner.Domain.Data.SeedData;
using PassouScanner.Domain.Entities;
using PassouScanner.Domain.Security;

namespace PassouScanner.Domain.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<PassouScannerDbContext>();

        await SeedUsersAsync(context);
        await SeedVehicleTypesAsync(context);
        await SeedBrandsAsync(context);
    }

    public static async Task SeedVehicleTypesAsync(PassouScannerDbContext context)
    {
        if (await context.Set<VehicleType>().AnyAsync())
            return;

        var now = DateTime.UtcNow;
        var vehicleTypes = VehicleTypeSeedData.VehicleTypes.Select((vehicleType, index) => new VehicleType
        {
            NavigationId = vehicleType.Id,
            Name = vehicleType.Name,
            Order = index + 1,
            CreatedAt = now,
            CreatedBy = Guid.Empty,
            Active = true
        }).ToList();

        await context.Set<VehicleType>().AddRangeAsync(vehicleTypes);
        await context.SaveChangesAsync();
    }

    public static async Task SeedBrandsAsync(PassouScannerDbContext context)
    {
        if (await context.Set<Brand>().AnyAsync())
            return;

        var now = DateTime.UtcNow;
        var carId = VehicleTypeSeedData.IdOf("Carro");
        var motorcycleId = VehicleTypeSeedData.IdOf("Moto");

        var brands = BrandSeedData.CarBrands.Select(name => (Name: name, VehicleTypeId: carId))
            .Concat(BrandSeedData.MotorcycleBrands.Select(name => (Name: name, VehicleTypeId: motorcycleId)))
            .Select(brand => new Brand
            {
                NavigationId = Guid.NewGuid(),
                Name = brand.Name,
                VehicleTypeId = brand.VehicleTypeId,
                CreatedAt = now,
                CreatedBy = Guid.Empty,
                Active = true
            }).ToList();

        await context.Set<Brand>().AddRangeAsync(brands);
        await context.SaveChangesAsync();
    }

    public static async Task SeedUsersAsync(PassouScannerDbContext context)
    {
        if (await context.Set<User>().AnyAsync(u => u.Email == "kleber.ribeiro@intra.com.br"))
            return;

        var user = new User
        {
            NavigationId = Guid.NewGuid(),
            Name = "Kleber",
            Email = "kleber.ribeiro@intra.com.br",
            PasswordHash = PasswordHasher.Hash("123456"),
            CreatedAt = DateTime.UtcNow,
            CreatedBy = Guid.Empty,
            Active = true
        };

        await context.Set<User>().AddAsync(user);
        await context.SaveChangesAsync();
    }
}
