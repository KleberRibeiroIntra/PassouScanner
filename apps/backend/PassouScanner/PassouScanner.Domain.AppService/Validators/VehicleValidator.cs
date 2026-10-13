using FluentValidation;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.AppService.Validators;

public class VehicleValidator : AbstractValidator<Vehicle>
{
    public VehicleValidator()
    {
        var maxYear = DateTime.UtcNow.Year + 1;

        RuleFor(v => v.Plate)
            .NotEmpty()
            .Matches("^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$")
            .WithMessage("Placa inválida. Use o formato ABC1234 ou ABC1D23.");
        RuleFor(v => v.Color).MaximumLength(50);
        RuleFor(v => v.UserId).NotEmpty();
        RuleFor(v => v.ModelId).NotEmpty();
        RuleFor(v => v.ManufactureYear).InclusiveBetween(1900, maxYear);
        RuleFor(v => v.ModelYear).InclusiveBetween(1900, maxYear);
        RuleFor(v => v.ModelYear)
            .Must((v, modelYear) => modelYear >= v.ManufactureYear && modelYear <= v.ManufactureYear + 1)
            .When(v => v.ModelYear.HasValue && v.ManufactureYear.HasValue)
            .WithMessage("O ano do modelo deve ser igual ao de fabricação ou um ano depois.");
    }
}
