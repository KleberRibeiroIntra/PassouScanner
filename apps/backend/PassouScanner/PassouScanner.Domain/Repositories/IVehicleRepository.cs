using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.Repositories;

public interface IVehicleRepository : IRepositoryBase<Vehicle>
{
    Task<DynamicQueryResult<Vehicle>> GetPagedByUserAsync(Guid userId, DynamicQuery query);
    Task<Vehicle?> GetByUserAsync(Guid userId, Guid navigationId);
    Task<Vehicle?> GetDetailsByUserAsync(Guid userId, Guid navigationId);
    Task<bool> ExistsByPlateAsync(Guid userId, string plate, Guid ignoreNavigationId);
    Task<bool> ModelExistsAsync(Guid modelId);
}
