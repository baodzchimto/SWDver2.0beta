namespace Hmss.Api.DTOs.Search;
public class SearchPageResponseDto
{
    public List<ListingSummaryDto> Summaries { get; set; } = new();
    public List<LocationDataDto> LocationData { get; set; } = new();
}
