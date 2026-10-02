namespace PassouScanner.Domain.Entities;

public record User : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;

    public ICollection<Vehicle> Vehicles { get; set; } = [];
    public ICollection<Workshop> Workshops { get; set; } = [];
}
