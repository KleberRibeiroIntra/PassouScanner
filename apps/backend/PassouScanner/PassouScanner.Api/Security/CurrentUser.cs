using PassouScanner.Api.Extensions;
using PassouScanner.Domain.AppService.Services.Interfaces;

namespace PassouScanner.Api.Security;

public class CurrentUser : ICurrentUser
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUser(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid? UserId => _httpContextAccessor.HttpContext?.User.FindUserId();
}
