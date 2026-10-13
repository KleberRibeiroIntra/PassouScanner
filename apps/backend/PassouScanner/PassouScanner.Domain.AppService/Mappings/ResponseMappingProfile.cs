using AutoMapper;
using PassouScanner.Domain.AppService.Dtos.Responses.UserResponses;
using PassouScanner.Domain.AppService.Dtos.Responses.VehicleResponses;
using PassouScanner.Domain.AppService.Dtos.Responses.WorkshopResponses;
using PassouScanner.Domain.Entities;

namespace PassouScanner.Domain.AppService.Mappings;

public class ResponseMappingProfile : Profile
{
    public ResponseMappingProfile()
    {
        CreateMap<User, UserResponse>()
            .ForMember(dest => dest.NavigationId, opt => opt.MapFrom(src => src.NavigationId));

        CreateMap<Vehicle, VehicleResponse>()
            .ForMember(dest => dest.ModelName, opt => opt.MapFrom(src => src.Model!.Name))
            .ForMember(dest => dest.ModelVersion, opt => opt.MapFrom(src => src.Model!.Version))
            .ForMember(dest => dest.BrandId, opt => opt.MapFrom(src => src.Model!.BrandId))
            .ForMember(dest => dest.BrandName, opt => opt.MapFrom(src => src.Model!.Brand!.Name));

        CreateMap<Workshop, WorkshopResponse>();
    }
}
