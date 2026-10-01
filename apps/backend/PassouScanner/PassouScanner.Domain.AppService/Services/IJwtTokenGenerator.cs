using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.AppService.Services;

public interface IJwtTokenGenerator
{
    (string Token, DateTime ExpiresAt) GenerateToken(User user);
}
