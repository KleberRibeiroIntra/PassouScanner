using AutoMapper;
using PassouScanner.Domain.AppService.Dtos.Requests;
using PassouScanner.Domain.Entities;
using PassouScanner.Domain.Security;

namespace PassouScanner.Domain.AppService.Mappings;

public class RequestMappingProfile : Profile
{
    public RequestMappingProfile()
    {
        CreateMap<UserRequest, User>()
            .ForMember(dest => dest.PasswordHash, opt =>
            {
                opt.PreCondition(src => !string.IsNullOrWhiteSpace(src.Password));
                opt.MapFrom(src => PasswordHasher.Hash(src.Password));
            });
    }
}
