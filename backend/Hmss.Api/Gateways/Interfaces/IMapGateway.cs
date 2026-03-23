using Hmss.Api.DTOs.Room;
using Hmss.Api.DTOs.Search;
using Hmss.Api.Entities;

namespace Hmss.Api.Gateways.Interfaces;

public interface IMapGateway
{
    Task<List<LocationDataDto>> GetLocationDataAsync(List<RoomListing> listings);
    Task<MapDto> GetMapDataAsync(string locationData);
}
