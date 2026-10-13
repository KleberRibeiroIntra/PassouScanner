using PassouScanner.Domain.AppService.Dtos.Requests.VehicleRequests;
using PassouScanner.Domain.AppService.Dtos.Responses.VehicleResponses;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.AppService.Services.Interfaces;

public interface IVehicleService : IServiceBase<Vehicle, VehicleRequest, VehicleResponse>
{
    Task<DynamicQueryResult<VehicleResponse>> GetPagedAsync(Guid userId, DynamicQuery query);
    Task<VehicleResponse?> GetByIdAsync(Guid userId, Guid navigationId);
    Task<VehicleResponse> CreateAsync(Guid userId, VehicleRequest request);
    Task<VehicleResponse?> UpdateAsync(Guid userId, Guid navigationId, VehicleRequest request);
    Task<bool> DeleteAsync(Guid userId, Guid navigationId);
}
