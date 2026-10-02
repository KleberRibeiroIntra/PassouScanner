namespace PassouScanner.Domain.Entities;

public record Brand : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public Guid VehicleTypeId { get; set; }
    public VehicleType? VehicleType { get; set; }

    public ICollection<Model> Models { get; set; } = [];
}
