using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
using PassouScanner.Domain.AppService.Dtos.Requests.VehicleRequests;
using PassouScanner.Domain.AppService.Dtos.Responses.VehicleResponses;
using PassouScanner.Domain.AppService.Services.Interfaces;
using PassouScanner.Domain.Entities;
using PassouScanner.Domain.Repositories;

namespace PassouScanner.Domain.AppService.Services;

public class VehicleService : ServiceBase<Vehicle, VehicleRequest, VehicleResponse>, IVehicleService
{
    private readonly IVehicleRepository _vehicleRepository;

    public VehicleService(IVehicleRepository repository, IMapper mapper, ICurrentUser currentUser, IValidator<Vehicle> validator)
        : base(repository, mapper, currentUser, validator)
    {
        _vehicleRepository = repository;
    }

    protected override async Task ValidateAsync(Vehicle entity)
    {
        await base.ValidateAsync(entity);

        if (!await _vehicleRepository.ModelExistsAsync(entity.ModelId))
            throw new ValidationException([new ValidationFailure(nameof(Vehicle.ModelId), "Modelo não encontrado.")]);

        if (await _vehicleRepository.ExistsByPlateAsync(entity.UserId, entity.Plate, entity.NavigationId))
            throw new ValidationException([new ValidationFailure(nameof(Vehicle.Plate), "Você já possui um veículo com esta placa.")]);
    }

    public async Task<DynamicQueryResult<VehicleResponse>> GetPagedAsync(Guid userId, DynamicQuery query)
    {
        var result = await _vehicleRepository.GetPagedByUserAsync(userId, query);

        return new DynamicQueryResult<VehicleResponse>(result.PageSize)
        {
            PageNumber = result.PageNumber,
            TotalRows = result.TotalRows,
            QueryString = result.QueryString,
            Result = Mapper.Map<List<VehicleResponse>>(result.Result)
        };
    }

    public async Task<VehicleResponse?> GetByIdAsync(Guid userId, Guid navigationId)
    {
        var vehicle = await _vehicleRepository.GetDetailsByUserAsync(userId, navigationId);
        return vehicle is null ? null : Mapper.Map<VehicleResponse>(vehicle);
    }

    public async Task<VehicleResponse> CreateAsync(Guid userId, VehicleRequest request)
    {
        var vehicle = Mapper.Map<Vehicle>(request);
        vehicle.UserId = userId;

        var created = await CreateAsync(vehicle);
        return await GetByIdAsync(userId, created.NavigationId) ?? created;
    }

    public async Task<VehicleResponse?> UpdateAsync(Guid userId, Guid navigationId, VehicleRequest request)
    {
        var existing = await _vehicleRepository.GetByUserAsync(userId, navigationId);
        if (existing is null)
            return null;

        Mapper.Map(request, existing);
        await UpdateAsync(existing);

        return await GetByIdAsync(userId, navigationId);
    }

    public async Task<bool> DeleteAsync(Guid userId, Guid navigationId)
    {
        var existing = await _vehicleRepository.GetByUserAsync(userId, navigationId);
        if (existing is null)
            return false;

        await DeleteAsync(existing);
        return true;
    }
}
