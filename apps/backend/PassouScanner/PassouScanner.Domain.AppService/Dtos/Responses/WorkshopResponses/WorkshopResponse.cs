namespace PassouScanner.Domain.AppService.Dtos.Responses.WorkshopResponses;

public class WorkshopResponse
{
    public Guid NavigationId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool Active { get; set; }
}
