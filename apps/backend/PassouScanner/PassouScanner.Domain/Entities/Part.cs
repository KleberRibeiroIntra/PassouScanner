namespace PassouScanner.Domain.Entities;

public record Part : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public int? RecommendedMileage { get; set; }
    public int? RecommendedMonths { get; set; }
    public Guid? VehicleTypeId { get; set; }
    public VehicleType? VehicleType { get; set; }

    public ICollection<MaintenanceItem> MaintenanceItems { get; set; } = [];
}
