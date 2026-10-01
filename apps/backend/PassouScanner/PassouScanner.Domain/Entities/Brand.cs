namespace PassouScanner.Domain.Entities;

/// <summary>Marca de veículo. Marcas que fazem carro e moto (Honda, Suzuki, BMW) têm uma linha por tipo.</summary>
public record Brand : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public Guid VehicleTypeId { get; set; }
    public VehicleType? VehicleType { get; set; }
}
