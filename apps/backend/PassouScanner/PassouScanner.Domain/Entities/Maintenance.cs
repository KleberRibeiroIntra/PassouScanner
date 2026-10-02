namespace PassouScanner.Domain.Entities;

public record Maintenance : BaseEntity
{
    public string Description { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public int Mileage { get; set; }
    public decimal? Cost { get; set; }
    public Guid VehicleId { get; set; }
    public Vehicle? Vehicle { get; set; }
    public Guid? WorkshopId { get; set; }
    public Workshop? Workshop { get; set; }

    public ICollection<MaintenanceItem> Items { get; set; } = [];
}
