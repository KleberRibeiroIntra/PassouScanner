namespace PassouScanner.Domain.Entities;

/// <summary>Tipo do veículo (Carro, Moto).</summary>
public record VehicleType : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public int Order { get; set; }

    public ICollection<Brand> Brands { get; set; } = [];
}
