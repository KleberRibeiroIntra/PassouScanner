using Microsoft.EntityFrameworkCore;
using PassouScanner.Domain.Data.Extensions;
using PassouScanner.Domain.Entities;
using PassouScanner.Domain.Repositories;

namespace PassouScanner.Domain.Data.Repositories;

public class VehicleRepository : RepositoryBase<Vehicle>, IVehicleRepository
{
    public VehicleRepository(PassouScannerDbContext context) : base(context)
    {
    }

    private IQueryable<Vehicle> WithDetails() =>
        DbSet.AsNoTracking()
            .Include(v => v.Model)
            .ThenInclude(m => m!.Brand)
            .Where(v => v.Active);

    public Task<DynamicQueryResult<Vehicle>> GetPagedByUserAsync(Guid userId, DynamicQuery query) =>
        WithDetails().Where(v => v.UserId == userId).ToPagedAsync(query);

    public Task<Vehicle?> GetByUserAsync(Guid userId, Guid navigationId) =>
        DbSet.FirstOrDefaultAsync(v => v.NavigationId == navigationId && v.UserId == userId && v.Active);

    public Task<Vehicle?> GetDetailsByUserAsync(Guid userId, Guid navigationId) =>
        WithDetails().FirstOrDefaultAsync(v => v.NavigationId == navigationId && v.UserId == userId);

    public Task<bool> ExistsByPlateAsync(Guid userId, string plate, Guid ignoreNavigationId) =>
        DbSet.AnyAsync(v => v.UserId == userId && v.Plate == plate && v.Active && v.NavigationId != ignoreNavigationId);

    public Task<bool> ModelExistsAsync(Guid modelId) =>
        Context.Set<Model>().AnyAsync(m => m.NavigationId == modelId && m.Active);
}
