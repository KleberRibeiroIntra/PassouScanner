namespace PassouScanner.Domain.Entities;

public record VehicleType : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public int Order { get; set; }

    public ICollection<Brand> Brands { get; set; } = [];
    public ICollection<Part> Parts { get; set; } = [];
}
