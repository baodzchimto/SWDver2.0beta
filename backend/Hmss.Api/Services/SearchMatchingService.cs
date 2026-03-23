using Hmss.Api.DTOs.Search;
using Hmss.Api.Entities;
using System.Text.Json;

namespace Hmss.Api.Services;

public class SearchMatchingService
{
    public List<RoomListing> FilterByCriteria(List<RoomListing> listings, SearchCriteriaDto criteria)
    {
        var query = listings.AsEnumerable();

        if (!string.IsNullOrWhiteSpace(criteria.Location))
        {
            var loc = criteria.Location.ToLowerInvariant();
            query = query.Where(x => (x.Property?.Address ?? string.Empty).ToLowerInvariant().Contains(loc)
                || x.Title.ToLowerInvariant().Contains(loc));
        }

        if (criteria.MinPrice.HasValue)
            query = query.Where(x => x.Price >= criteria.MinPrice.Value);

        if (criteria.MaxPrice.HasValue)
            query = query.Where(x => x.Price <= criteria.MaxPrice.Value);

        if (criteria.AvailableFrom.HasValue)
            query = query.Where(x => x.AvailableFrom <= criteria.AvailableFrom.Value);

        if (!string.IsNullOrWhiteSpace(criteria.FurnishedStatus))
            query = query.Where(x => x.FurnishedStatus == criteria.FurnishedStatus);

        if (criteria.PrivateWC.HasValue && criteria.PrivateWC.Value)
            query = query.Where(x => x.PrivateWCStatus == "Private");

        if (criteria.Amenities != null && criteria.Amenities.Count > 0)
        {
            query = query.Where(x =>
            {
                if (string.IsNullOrWhiteSpace(x.Amenities)) return false;
                try
                {
                    var amenities = JsonSerializer.Deserialize<List<string>>(x.Amenities) ?? new();
                    return criteria.Amenities.All(a => amenities.Contains(a, StringComparer.OrdinalIgnoreCase));
                }
                catch { return false; }
            });
        }

        return query.ToList();
    }

    public List<ListingSummaryDto> BuildListingSummaries(List<RoomListing> listings)
    {
        return listings.Select(x =>
        {
            string? firstImage = null;
            if (!string.IsNullOrWhiteSpace(x.ImagesRef))
            {
                try
                {
                    var imgs = JsonSerializer.Deserialize<List<string>>(x.ImagesRef);
                    firstImage = imgs?.FirstOrDefault();
                }
                catch { }
            }

            return new ListingSummaryDto
            {
                ListingId = x.ListingId,
                Title = x.Title,
                Price = x.Price,
                Capacity = x.Capacity,
                FurnishedStatus = x.FurnishedStatus,
                FirstImageUrl = firstImage,
                Address = x.Property?.Address ?? string.Empty,
                Status = x.Status
            };
        }).ToList();
    }
}
