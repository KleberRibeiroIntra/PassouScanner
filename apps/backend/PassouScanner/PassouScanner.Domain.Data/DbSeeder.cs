using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
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
