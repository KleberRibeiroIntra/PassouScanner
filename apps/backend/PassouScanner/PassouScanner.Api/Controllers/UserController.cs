using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PassouScanner.Domain;
using PassouScanner.Domain.AppService.Dtos.QueryRequests;
using PassouScanner.Domain.AppService.Dtos.Requests;
using PassouScanner.Domain.AppService.Dtos.Responses;
using PassouScanner.Domain.AppService.Services;

namespace PassouScanner.Api.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("paged")]
    public async Task<ActionResult<DynamicQueryResult<UserResponse>>> GetPaged([FromQuery] UserQueryRequest query)
    {
        var result = await _userService.GetPagedAsync(query);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<UserResponse>> GetById(Guid id)
    {
        var user = await _userService.GetByIdAsync(id);
        return user is null ? NotFound() : Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<UserResponse>> Create(UserRequest request)
    {
        var created = await _userService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<UserResponse>> Update(Guid id, UserRequest request)
    {
        var updated = await _userService.UpdateAsync(id, request);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _userService.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
