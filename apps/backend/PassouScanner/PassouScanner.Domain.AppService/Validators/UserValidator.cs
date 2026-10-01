using FluentValidation;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.AppService.Validators;

public class UserValidator : AbstractValidator<User>
{
    public UserValidator()
    {
        RuleFor(u => u.Name).NotEmpty().MaximumLength(200);
        RuleFor(u => u.Email).NotEmpty().EmailAddress().MaximumLength(320);
        RuleFor(u => u.PasswordHash).NotEmpty();
    }
}
