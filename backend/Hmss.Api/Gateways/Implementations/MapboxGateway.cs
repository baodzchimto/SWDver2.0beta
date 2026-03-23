using Hmss.Api.DTOs.Room;
using Hmss.Api.DTOs.Search;
using Hmss.Api.Entities;
using Hmss.Api.Gateways.Interfaces;
using System.Text.Json;

namespace Hmss.Api.Gateways.Implementations;

public class MapboxGateway : IMapGateway
{
    private readonly IConfiguration _config;
    private readonly ILogger<MapboxGateway> _logger;
    private readonly HttpClient _http;

    public MapboxGateway(IConfiguration config, ILogger<MapboxGateway> logger, IHttpClientFactory httpClientFactory)
    {
        _config = config;
        _logger = logger;
        _http = httpClientFactory.CreateClient();
        _http.Timeout = TimeSpan.FromSeconds(5);
    }

    public async Task<List<LocationDataDto>> GetLocationDataAsync(List<RoomListing> listings)
    {
        var token = _config["Mapbox:AccessToken"];
        if (string.IsNullOrWhiteSpace(token))
            return new List<LocationDataDto>();

        var result = new List<LocationDataDto>();
        foreach (var listing in listings)
        {
            try
            {
                var address = listing.Property?.Address ?? string.Empty;
                if (string.IsNullOrWhiteSpace(address)) continue;

                var (lat, lng) = await GeocodeAsync(address, token);
                if (lat.HasValue && lng.HasValue)
                {
                    result.Add(new LocationDataDto
                    {
                        ListingId = listing.ListingId,
                        Lat = lat.Value,
                        Lng = lng.Value,
                        MapUrl = null
                    });
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Mapbox geocoding failed for listing {Id}: {Msg}", listing.ListingId, ex.Message);
            }
        }
        return result;
    }

    public async Task<MapDto> GetMapDataAsync(string locationData)
    {
        var token = _config["Mapbox:AccessToken"];
        if (string.IsNullOrWhiteSpace(token))
            return new MapDto();

        try
        {
            var (lat, lng) = await GeocodeAsync(locationData, token);
            if (lat.HasValue && lng.HasValue)
            {
                return new MapDto
                {
                    EmbedUrl = null,
                    Lat = lat.Value,
                    Lng = lng.Value
                };
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning("Mapbox geocoding failed for location {Loc}: {Msg}", locationData, ex.Message);
        }

        return new MapDto();
    }

    /// <summary>
    /// Mapbox Geocoding v5. Returns (lat, lng).
    /// NOTE: Mapbox center array is [lng, lat] — opposite of Google.
    /// </summary>
    private async Task<(double? lat, double? lng)> GeocodeAsync(string query, string token)
    {
        var encoded = Uri.EscapeDataString(query);
        var url = $"https://api.mapbox.com/geocoding/v5/mapbox.places/{encoded}.json?access_token={token}&limit=1";
        var response = await _http.GetStringAsync(url);
        var json = JsonDocument.Parse(response);
        var features = json.RootElement.GetProperty("features");

        if (features.GetArrayLength() > 0)
        {
            var center = features[0].GetProperty("center");
            var lng = center[0].GetDouble(); // Mapbox: [lng, lat]
            var lat = center[1].GetDouble();
            return (lat, lng);
        }

        return (null, null);
    }
}
