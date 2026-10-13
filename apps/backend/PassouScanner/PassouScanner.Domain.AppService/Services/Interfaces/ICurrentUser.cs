namespace PassouScanner.Domain.AppService.Services.Interfaces;

public interface ICurrentUser
{
    Guid? UserId { get; }
}
