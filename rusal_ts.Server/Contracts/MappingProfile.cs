using AutoMapper;
using rusal.Server.Contracts.DTO;
using rusal.Server.DAL.Entities;

namespace rusal.Server.Contracts
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ForMember(dest=>dest.Password, opt => opt.MapFrom(src=>src.PasswordHash)).ReverseMap();
        }
    }
}
