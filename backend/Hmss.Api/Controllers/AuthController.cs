using Hmss.Api.Auth;
using Hmss.Api.DTOs.Auth;
using Hmss.Api.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Hmss.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserAccountRepository _userRepo;
    private readonly JwtTokenService _jwtService;
    private readonly JwtConfig _jwtConfig;

    public AuthController(IUserAccountRepository userRepo, JwtTokenService jwtService, IOptions<JwtConfig> jwtConfig)
    {
        _userRepo = userRepo;
        _jwtService = jwtService;
        _jwtConfig = jwtConfig.Value;
    }

    [HttpPost("login")]
    public async Task<IActionResult> SignIn([FromBody] SignInRequestDto request)
    {
        var account = await _userRepo.FindByEmailAsync(request.Email);
        if (account == null || !BCrypt.Net.BCrypt.Verify(request.Password, account.PasswordHash))
            return Unauthorized(new { Message = "Invalid email or password" });

        if (account.AccountStatus == "Disabled")
            return Unauthorized(new { Message = "Your account has been disabled. Please contact support." });

        if (account.AccountStatus == "Suspended")
            return Unauthorized(new { Message = "Your account has been suspended. Please contact support." });

        var token = _jwtService.GenerateToken(account.UserId, account.Role, account.Email);
        var expiresAt = DateTime.UtcNow.AddMinutes(_jwtConfig.ExpiryMinutes);

        return Ok(new SignInResponseDto
        {
            Token = token,
            UserId = account.UserId,
            Role = account.Role,
            FullName = account.FullName,
            ExpiresAt = expiresAt
        });
    }

    [HttpPost("logout")]
    public new IActionResult SignOut() => Ok(new { Message = "Logged out" }); // Client-side token discard

    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userId = ClaimsHelper.GetUserId(User);
        var account = await _userRepo.FindByIdAsync(userId);
        if (account == null) return NotFound();

        return Ok(new UserDto
        {
            UserId = account.UserId,
            FullName = account.FullName,
            Email = account.Email,
            Role = account.Role,
            AccountStatus = account.AccountStatus
        });
    }
}
