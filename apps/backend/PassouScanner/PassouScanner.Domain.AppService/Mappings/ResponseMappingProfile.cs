using AutoMapper;
using PassouScanner.Domain.AppService.Dtos.Responses;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.AppService.Mappings;

public class ResponseMappingProfile : Profile
{
    public ResponseMappingProfile()
    {
        CreateMap<User, UserResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.NavigationId));
    }
}
