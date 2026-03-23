namespace Hmss.Api.DTOs.Auth;
public class SignInResponseDto
{
    public string Token { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public string Role { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
}
