using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.AppService.Services.Interfaces;

public interface IJwtTokenGenerator
{
    (string Token, DateTime ExpiresAt) GenerateToken(User user);
}
