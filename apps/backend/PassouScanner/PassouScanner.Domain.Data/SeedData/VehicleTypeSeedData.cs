namespace PassouScanner.Domain.Data.SeedData;

/// <summary>Tipos de veículo iniciais, com ids fixos pra poderem ser referenciados no código e em outros seeds.</summary>
internal static class VehicleTypeSeedData
{
    public static readonly (Guid Id, string Name)[] VehicleTypes =
    [
        (Guid.Parse("3f6c1a52-8b0e-4d7a-9c21-5e4b7f0a1d01"), "Carro"),
        (Guid.Parse("a2d9e7c4-1f35-4b68-8e90-6c3b2d5f7e02"), "Moto"),
    ];

    public static Guid IdOf(string name) => VehicleTypes.Single(v => v.Name == name).Id;
}
