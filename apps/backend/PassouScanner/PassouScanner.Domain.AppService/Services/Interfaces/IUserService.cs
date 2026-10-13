using PassouScanner.Domain.AppService.Dtos.Requests.UserRequests;
using PassouScanner.Domain.AppService.Dtos.Responses.UserResponses;
using PassouScanner.Domain.AppService.Services.Interfaces;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.AppService.Interfaces;

public interface IUserService : IServiceBase<User, UserRequest, UserResponse>
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
}
