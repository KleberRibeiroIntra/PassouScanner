using PassouScanner.Domain.AppService.Dtos.Requests.WorkshopRequests;
using PassouScanner.Domain.AppService.Dtos.Responses.WorkshopResponses;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.AppService.Services.Interfaces;

public interface IWorkshopService : IServiceBase<Workshop, WorkshopRequest, WorkshopResponse>
{
    Task<DynamicQueryResult<WorkshopResponse>> GetPagedAsync(Guid userId, DynamicQuery query);
    Task<WorkshopResponse?> GetByIdAsync(Guid userId, Guid navigationId);
    Task<WorkshopResponse> CreateAsync(Guid userId, WorkshopRequest request);
    Task<WorkshopResponse?> UpdateAsync(Guid userId, Guid navigationId, WorkshopRequest request);
    Task<bool> DeleteAsync(Guid userId, Guid navigationId);
}
