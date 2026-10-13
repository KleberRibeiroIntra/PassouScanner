using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using PassouScanner.Domain.AppService.Dtos.Requests.WorkshopRequests;
using PassouScanner.Domain.AppService.Dtos.Responses.WorkshopResponses;
using PassouScanner.Domain.AppService.Services.Interfaces;
using PassouScanner.Domain.Entities;
using PassouScanner.Domain.Repositories;

namespace PassouScanner.Domain.AppService.Services;

public class WorkshopService : ServiceBase<Workshop, WorkshopRequest, WorkshopResponse>, IWorkshopService
{
    private readonly IWorkshopRepository _workshopRepository;

    public WorkshopService(IWorkshopRepository repository, IMapper mapper, ICurrentUser currentUser, IValidator<Workshop> validator)
        : base(repository, mapper, currentUser, validator)
    {
        _workshopRepository = repository;
    }

    protected override async Task ValidateAsync(Workshop entity)
    {
        await base.ValidateAsync(entity);

        if (await _workshopRepository.ExistsByNameAsync(entity.UserId, entity.Name, entity.NavigationId))
            throw new ValidationException([new ValidationFailure(nameof(Workshop.Name), "Você já possui uma oficina com este nome.")]);
    }

    public async Task<DynamicQueryResult<WorkshopResponse>> GetPagedAsync(Guid userId, DynamicQuery query)
    {
        var result = await _workshopRepository.GetPagedByUserAsync(userId, query);

        return new DynamicQueryResult<WorkshopResponse>(result.PageSize)
        {
            PageNumber = result.PageNumber,
            TotalRows = result.TotalRows,
            QueryString = result.QueryString,
            Result = Mapper.Map<List<WorkshopResponse>>(result.Result)
        };
    }

    public async Task<WorkshopResponse?> GetByIdAsync(Guid userId, Guid navigationId)
    {
        var workshop = await _workshopRepository.GetByUserAsync(userId, navigationId);
        return workshop is null ? null : Mapper.Map<WorkshopResponse>(workshop);
    }

    public Task<WorkshopResponse> CreateAsync(Guid userId, WorkshopRequest request)
    {
        var workshop = Mapper.Map<Workshop>(request);
        workshop.UserId = userId;

        return CreateAsync(workshop);
    }

    public async Task<WorkshopResponse?> UpdateAsync(Guid userId, Guid navigationId, WorkshopRequest request)
    {
        var existing = await _workshopRepository.GetByUserAsync(userId, navigationId);
        if (existing is null)
            return null;

        Mapper.Map(request, existing);
        return await UpdateAsync(existing);
    }

    public async Task<bool> DeleteAsync(Guid userId, Guid navigationId)
    {
        var existing = await _workshopRepository.GetByUserAsync(userId, navigationId);
        if (existing is null)
            return false;

        await DeleteAsync(existing);
        return true;
    }
}
