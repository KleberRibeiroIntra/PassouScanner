namespace PassouScanner.Domain.Entities;

public record Workshop : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public Guid UserId { get; set; }
    public User? User { get; set; }

    public ICollection<Maintenance> Maintenances { get; set; } = [];
}
