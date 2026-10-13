using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PassouScanner.Api.Extensions;
using PassouScanner.Domain;
using PassouScanner.Domain.AppService.Dtos.QueryRequests.VehicleQueryRequests;
using PassouScanner.Domain.AppService.Dtos.Requests.VehicleRequests;
using PassouScanner.Domain.AppService.Dtos.Responses.VehicleResponses;
using PassouScanner.Domain.AppService.Services.Interfaces;

namespace PassouScanner.Api.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class VehicleController : ControllerBase
{
    private readonly IVehicleService _vehicleService;

    public VehicleController(IVehicleService vehicleService)
    {
        _vehicleService = vehicleService;
    }

    [HttpGet("paged")]
    public async Task<ActionResult<DynamicQueryResult<VehicleResponse>>> GetPaged([FromQuery] VehicleQueryRequest query)
    {
        var result = await _vehicleService.GetPagedAsync(User.GetUserId(), query);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<VehicleResponse>> GetById(Guid id)
    {
        var vehicle = await _vehicleService.GetByIdAsync(User.GetUserId(), id);
        return vehicle is null ? NotFound() : Ok(vehicle);
    }

    [HttpPost]
    public async Task<ActionResult<VehicleResponse>> Create(VehicleRequest request)
    {
        var created = await _vehicleService.CreateAsync(User.GetUserId(), request);
        return CreatedAtAction(nameof(GetById), new { id = created.NavigationId }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<VehicleResponse>> Update(Guid id, VehicleRequest request)
    {
        var updated = await _vehicleService.UpdateAsync(User.GetUserId(), id, request);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _vehicleService.DeleteAsync(User.GetUserId(), id);
        return deleted ? NoContent() : NotFound();
    }
}
