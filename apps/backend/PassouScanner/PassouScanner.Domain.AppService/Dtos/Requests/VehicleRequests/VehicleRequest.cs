namespace PassouScanner.Domain.AppService.Dtos.Requests.VehicleRequests;

public class VehicleRequest
{
    public string Plate { get; set; } = string.Empty;
    public int? ManufactureYear { get; set; }
    public int? ModelYear { get; set; }
    public string? Color { get; set; }
    public Guid ModelId { get; set; }
}
