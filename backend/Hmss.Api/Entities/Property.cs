using Hmss.Api.DTOs.Property;

namespace Hmss.Api.Entities;

public class Property
{
    public Guid PropertyId { get; private set; }
    public Guid OwnerId { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public string Address { get; private set; } = string.Empty;
    public string? MapLocation { get; private set; }
    public string? Description { get; private set; }
    public string? GeneralPolicies { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime UpdatedAt { get; private set; }

    private Property() { }

    public static Property Create(Guid ownerId, string name, string address, string? mapLocation, string? description, string? generalPolicies)
    {
        return new Property
        {
            PropertyId = Guid.NewGuid(),
            OwnerId = ownerId,
            Name = name,
            Address = address,
            MapLocation = mapLocation,
            Description = description,
            GeneralPolicies = generalPolicies,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
    }

    public StatusChangeResult ApplyUpdates(PropertyUpdateDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return new StatusChangeResult(false, "Name cannot be empty");

        Name = request.Name;
        Address = request.Address ?? Address;
        MapLocation = request.MapLocation;
        Description = request.Description;
        GeneralPolicies = request.GeneralPolicies;
        UpdatedAt = DateTime.UtcNow;
        return new StatusChangeResult(true);
    }
}
