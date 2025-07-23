using dotnet_backend_api.Models.DTOs;
using dotnet_backend_api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace dotnet_backend_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentService _service;
        private readonly JwtService _jwtService;
        private readonly IWebHostEnvironment _env;
        // In-memory refresh token store for demo
        private static readonly Dictionary<string, string> RefreshTokens = new();
        public StudentsController(IStudentService service, JwtService jwtService, IWebHostEnvironment env)
        {
            _service = service;
            _jwtService = jwtService;
            _env = env;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<StudentDto>>> GetAll()
        {
            var students = await _service.GetAllAsync();
            return Ok(students);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<StudentDto>> GetById(string id)
        {
            var student = await _service.GetByIdAsync(id);
            if (student == null) return NotFound();
            return Ok(student);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<StudentDto>> Create([FromForm] StudentCreateDto dto, IFormFile? image)
        {
            string? imagePath = null;
            if (image != null)
            {
                var uploads = Path.Combine(_env.WebRootPath, "images");
                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);
                var fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
                var filePath = Path.Combine(uploads, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }
                imagePath = $"/images/{fileName}";
            }
            var created = await _service.CreateAsync(dto, imagePath);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(string id, [FromForm] StudentCreateDto dto, IFormFile? image)
        {
            string? imagePath = null;
            if (image != null)
            {
                var uploads = Path.Combine(_env.WebRootPath, "images");
                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);
                var fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
                var filePath = Path.Combine(uploads, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }
                imagePath = $"/images/{fileName}";
            }
            var updated = await _service.UpdateAsync(id, dto, imagePath);
            if (!updated) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(string id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<object>> Login([FromBody] LoginRequest request)
        {
            var student = await _service.LoginAsync(request.Email, request.Password);
            if (student == null) return Unauthorized();
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, student.Id),
                new Claim(ClaimTypes.Email, student.Email)
            };
            if (student.Roles != null)
            {
                claims.AddRange(student.Roles.Select(role => new Claim(ClaimTypes.Role, role)));
            }
            var accessToken = _jwtService.GenerateAccessToken(claims);
            var refreshToken = _jwtService.GenerateRefreshToken();
            // Store refresh token (for demo, use student.Id as key)
            RefreshTokens[student.Id] = refreshToken;
            return Ok(new
            {
                student,
                accessToken,
                refreshToken
            });
        }

        [HttpPost("refresh")]
        [AllowAnonymous]
        public ActionResult<object> Refresh([FromBody] RefreshRequest request)
        {
            var principal = _jwtService.GetPrincipalFromExpiredToken(request.AccessToken);
            if (principal == null) return Unauthorized();
            var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null || !RefreshTokens.TryGetValue(userId, out var savedRefreshToken) || savedRefreshToken != request.RefreshToken)
            {
                return Unauthorized();
            }
            // Generate new tokens
            var newAccessToken = _jwtService.GenerateAccessToken(principal.Claims);
            var newRefreshToken = _jwtService.GenerateRefreshToken();
            RefreshTokens[userId] = newRefreshToken;
            return Ok(new
            {
                accessToken = newAccessToken,
                refreshToken = newRefreshToken
            });
        }

        [HttpGet("by-email/{email}")]
        [Authorize]
        public async Task<ActionResult<StudentDto>> GetByEmail(string email)
        {
            var student = await _service.GetByEmailAsync(email);
            if (student == null) return NotFound();
            return Ok(student);
        }

        [HttpPut("{id}/registered-exams")]
        [Authorize]
        public async Task<IActionResult> UpdateRegisteredExams(string id, [FromBody] List<string> participatedExams)
        {
            var updated = await _service.UpdateRegisteredExamsAsync(id, participatedExams);
            if (!updated) return NotFound();
            return NoContent();
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }

    public class RefreshRequest
    {
        public string AccessToken { get; set; } = null!;
        public string RefreshToken { get; set; } = null!;
    }
} 