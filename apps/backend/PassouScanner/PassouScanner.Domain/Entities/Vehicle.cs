namespace PassouScanner.Domain.Entities;

public record Vehicle : BaseEntity
{
    public string Plate { get; set; } = string.Empty;
    public int? ManufactureYear { get; set; }
    public int? ModelYear { get; set; }
    public string? Color { get; set; }
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public Guid ModelId { get; set; }
    public Model? Model { get; set; }

    public ICollection<VehicleMileage> Mileages { get; set; } = [];
    public ICollection<Maintenance> Maintenances { get; set; } = [];
}
