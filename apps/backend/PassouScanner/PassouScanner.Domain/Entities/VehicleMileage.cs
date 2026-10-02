namespace PassouScanner.Domain.Entities;

public record VehicleMileage : BaseEntity
{
    public DateTime Date { get; set; }
    public int Mileage { get; set; }
    public Guid VehicleId { get; set; }
    public Vehicle? Vehicle { get; set; }
}
