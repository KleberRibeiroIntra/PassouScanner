using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PassouScanner.Api.Extensions;
using PassouScanner.Domain;
using PassouScanner.Domain.AppService.Dtos.QueryRequests.WorkshopQueryRequests;
using PassouScanner.Domain.AppService.Dtos.Requests.WorkshopRequests;
using PassouScanner.Domain.AppService.Dtos.Responses.WorkshopResponses;
using PassouScanner.Domain.AppService.Services.Interfaces;

namespace PassouScanner.Api.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class WorkshopController : ControllerBase
{
    private readonly IWorkshopService _workshopService;

    public WorkshopController(IWorkshopService workshopService)
    {
        _workshopService = workshopService;
    }

    [HttpGet("paged")]
    public async Task<ActionResult<DynamicQueryResult<WorkshopResponse>>> GetPaged([FromQuery] WorkshopQueryRequest query)
    {
        var result = await _workshopService.GetPagedAsync(User.GetUserId(), query);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<WorkshopResponse>> GetById(Guid id)
    {
        var workshop = await _workshopService.GetByIdAsync(User.GetUserId(), id);
        return workshop is null ? NotFound() : Ok(workshop);
    }

    [HttpPost]
    public async Task<ActionResult<WorkshopResponse>> Create(WorkshopRequest request)
    {
        var created = await _workshopService.CreateAsync(User.GetUserId(), request);
        return CreatedAtAction(nameof(GetById), new { id = created.NavigationId }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<WorkshopResponse>> Update(Guid id, WorkshopRequest request)
    {
        var updated = await _workshopService.UpdateAsync(User.GetUserId(), id, request);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _workshopService.DeleteAsync(User.GetUserId(), id);
        return deleted ? NoContent() : NotFound();
    }
}
