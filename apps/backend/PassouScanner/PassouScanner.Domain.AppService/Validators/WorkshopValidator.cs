using FluentValidation;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.AppService.Validators;

public class WorkshopValidator : AbstractValidator<Workshop>
{
    public WorkshopValidator()
    {
        RuleFor(w => w.Name).NotEmpty().MaximumLength(200);
        RuleFor(w => w.Phone).MaximumLength(20);
        RuleFor(w => w.Address).MaximumLength(300);
        RuleFor(w => w.UserId).NotEmpty();
    }
}
