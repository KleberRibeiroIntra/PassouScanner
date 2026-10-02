namespace PassouScanner.Domain.Entities;

public record Model : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Version { get; set; }
    public Guid BrandId { get; set; }
    public Brand? Brand { get; set; }

    public ICollection<Vehicle> Vehicles { get; set; } = [];
}
