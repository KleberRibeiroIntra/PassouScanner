using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PassouScanner.Domain.AppService.Mappings;
using PassouScanner.Domain.AppService.Services;
using PassouScanner.Domain.AppService.Validators;
using PassouScanner.Domain.Data;
using PassouScanner.Domain.Data.Repositories;
using PassouScanner.Domain.Repositories;

namespace PassouScanner.IoC;

public static class DependencyInjectionConfig
{
    public static IServiceCollection AddDependencyInjectionConfiguration(this IServiceCollection services,
        string connectionString)
    {
        services.AddDbContext<PassouScannerDbContext>(options => options.UseSqlite(connectionString));

        services.AddScoped<IUserRepository, UserRepository>();

        services.AddScoped<IUserService, UserService>();

        services.AddAutoMapper(cfg => { }, typeof(RequestMappingProfile).Assembly);
        services.AddValidatorsFromAssemblyContaining<UserValidator>();

        return services;
    }
}
