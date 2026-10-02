namespace PassouScanner.Domain.Entities;

public record MaintenanceItem : BaseEntity
{
    public string? PartBrand { get; set; }
    public string? Position { get; set; }
    public int Quantity { get; set; } = 1;
    public decimal? Price { get; set; }
    public Guid MaintenanceId { get; set; }
    public Maintenance? Maintenance { get; set; }
    public Guid PartId { get; set; }
    public Part? Part { get; set; }
}
