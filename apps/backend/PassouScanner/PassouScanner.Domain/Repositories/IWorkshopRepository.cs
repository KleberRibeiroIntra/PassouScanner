using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.Repositories;

public interface IWorkshopRepository : IRepositoryBase<Workshop>
{
    Task<DynamicQueryResult<Workshop>> GetPagedByUserAsync(Guid userId, DynamicQuery query);
    Task<Workshop?> GetByUserAsync(Guid userId, Guid navigationId);
    Task<bool> ExistsByNameAsync(Guid userId, string name, Guid ignoreNavigationId);
}
