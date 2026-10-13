namespace PassouScanner.Domain.AppService.Dtos.Responses.VehicleResponses;

public class VehicleResponse
{
    public Guid NavigationId { get; set; }
    public string Plate { get; set; } = string.Empty;
    public int? ManufactureYear { get; set; }
    public int? ModelYear { get; set; }
    public string? Color { get; set; }
    public Guid ModelId { get; set; }
    public string? ModelName { get; set; }
    public string? ModelVersion { get; set; }
    public Guid? BrandId { get; set; }
    public string? BrandName { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool Active { get; set; }
}
