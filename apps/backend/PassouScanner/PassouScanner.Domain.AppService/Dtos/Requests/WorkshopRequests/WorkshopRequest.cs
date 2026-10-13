namespace PassouScanner.Domain.AppService.Dtos.Requests.WorkshopRequests;

public class WorkshopRequest
{
    public string Name { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? Address { get; set; }
}
