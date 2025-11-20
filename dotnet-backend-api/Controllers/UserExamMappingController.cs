using dotnet_backend_api.Models.DTOs;
using dotnet_backend_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_backend_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class UserExamMappingController : ControllerBase
    {
        private readonly IUserExamMappingService _service;
        public UserExamMappingController(IUserExamMappingService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserExamMappingDto>>> GetAll()
        {
            var mappings = await _service.GetAllAsync();
            return Ok(mappings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserExamMappingDto>> GetById(string id)
        {
            var mapping = await _service.GetByIdAsync(id);
            if (mapping == null) return NotFound();
            return Ok(mapping);
        }

        [HttpPost]
        public async Task<ActionResult<UserExamMappingDto>> Create(UserExamMappingCreateDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, UserExamMappingCreateDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            if (!updated) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }

        [HttpGet("by-user/{userId}")]
        public async Task<ActionResult<List<UserExamMappingDto>>> GetDocumentsByUserId(string userId)
        {
            var mappings = await _service.GetDocumentsByUserIdAsync(userId);
            return Ok(mappings);
        }
    }
} 