using PassouScanner.Domain.AppService.Dtos.Requests;
using PassouScanner.Domain.AppService.Dtos.Responses;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.AppService.Services;

public interface IUserService : IServiceBase<User, UserRequest, UserResponse>
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
}
