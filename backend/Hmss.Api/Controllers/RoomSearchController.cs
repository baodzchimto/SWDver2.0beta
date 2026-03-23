using Hmss.Api.DTOs.Search;
using Hmss.Api.Gateways.Interfaces;
using Hmss.Api.Repositories.Interfaces;
using Hmss.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hmss.Api.Controllers;

[ApiController]
[Route("api/room-search")]
public class RoomSearchController : ControllerBase
{
    private readonly IRoomListingRepository _listingRepo;
    private readonly SearchMatchingService _searchService;
    private readonly IMapGateway _mapsGateway;

    public RoomSearchController(IRoomListingRepository listingRepo, SearchMatchingService searchService, IMapGateway mapsGateway)
    {
        _listingRepo = listingRepo;
        _searchService = searchService;
        _mapsGateway = mapsGateway;
    }

    [HttpGet("page")]
    public async Task<IActionResult> GetSearchPage()
    {
        var listings = await _listingRepo.FindPublishedListingsAsync();
        var summaries = _searchService.BuildListingSummaries(listings);
        var locationData = await _mapsGateway.GetLocationDataAsync(listings);
        return Ok(new SearchPageResponseDto { Summaries = summaries, LocationData = locationData });
    }

    [HttpPost("search")]
    public async Task<IActionResult> SearchRooms([FromBody] SearchCriteriaDto criteria)
    {
        var allListings = await _listingRepo.FindPublishedListingsAsync();
        var filtered = _searchService.FilterByCriteria(allListings, criteria);
        var summaries = _searchService.BuildListingSummaries(filtered);
        var locationData = await _mapsGateway.GetLocationDataAsync(filtered);
        return Ok(new SearchResponseDto { Summaries = summaries, LocationData = locationData, HasResults = filtered.Count > 0 });
    }

    [HttpGet("listing/{listingId:guid}")]
    public async Task<IActionResult> GetListingEntryPoint(Guid listingId)
    {
        var listing = await _listingRepo.FindPublishedByIdAsync(listingId);
        if (listing == null) return NotFound();
        return Ok(new ListingEntryPointResponseDto
        {
            ListingId = listing.ListingId,
            DetailUrl = $"/api/room/{listing.ListingId}"
        });
    }
}
