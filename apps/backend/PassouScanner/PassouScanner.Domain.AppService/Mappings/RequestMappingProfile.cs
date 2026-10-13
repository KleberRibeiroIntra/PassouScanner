using AutoMapper;
using PassouScanner.Domain.AppService.Dtos.Requests.UserRequests;
using PassouScanner.Domain.AppService.Dtos.Requests.VehicleRequests;
using PassouScanner.Domain.AppService.Dtos.Requests.WorkshopRequests;
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

        CreateMap<VehicleRequest, Vehicle>()
            .ForMember(dest => dest.Plate, opt => opt.MapFrom(src => src.Plate.Replace("-", "").Trim().ToUpperInvariant()))
            .ForMember(dest => dest.Color, opt => opt.MapFrom(src => string.IsNullOrWhiteSpace(src.Color) ? null : src.Color.Trim()));

        CreateMap<WorkshopRequest, Workshop>()
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name.Trim()))
            .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => string.IsNullOrWhiteSpace(src.Phone) ? null : src.Phone.Trim()))
            .ForMember(dest => dest.Address, opt => opt.MapFrom(src => string.IsNullOrWhiteSpace(src.Address) ? null : src.Address.Trim()));
    }
}
