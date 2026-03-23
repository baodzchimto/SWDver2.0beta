namespace Hmss.Api.DTOs.Search;
public class SearchResponseDto
{
    public List<ListingSummaryDto> Summaries { get; set; } = new();
    public List<LocationDataDto> LocationData { get; set; } = new();
    public bool HasResults { get; set; }
}
