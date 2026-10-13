using Microsoft.EntityFrameworkCore;
using PassouScanner.Domain.Data.Extensions;
using PassouScanner.Domain.Entities;
using PassouScanner.Domain.Repositories;

namespace PassouScanner.Domain.Data.Repositories;

public class WorkshopRepository : RepositoryBase<Workshop>, IWorkshopRepository
{
    public WorkshopRepository(PassouScannerDbContext context) : base(context)
    {
    }

    public Task<DynamicQueryResult<Workshop>> GetPagedByUserAsync(Guid userId, DynamicQuery query) =>
        DbSet.AsNoTracking().Where(w => w.Active && w.UserId == userId).ToPagedAsync(query);

    public Task<Workshop?> GetByUserAsync(Guid userId, Guid navigationId) =>
        DbSet.FirstOrDefaultAsync(w => w.NavigationId == navigationId && w.UserId == userId && w.Active);

    public Task<bool> ExistsByNameAsync(Guid userId, string name, Guid ignoreNavigationId) =>
        DbSet.AnyAsync(w => w.UserId == userId && w.Name.ToLower() == name.ToLower() && w.Active && w.NavigationId != ignoreNavigationId);
}
