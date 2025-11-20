using dotnet_backend_api.Models.DTOs;
using dotnet_backend_api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace dotnet_backend_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Roles = "Admin,Teacher")]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseService _service;
        public CoursesController(ICourseService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<CourseDto>>> GetAll()
        {
            var courses = await _service.GetAllAsync();
            return Ok(courses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDto>> GetById(string id)
        {
            var course = await _service.GetByIdAsync(id);
            if (course == null) return NotFound();
            return Ok(course);
        }

        [HttpPost]
        public async Task<ActionResult<CourseDto>> Create(CourseCreateDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, CourseCreateDto dto)
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
    }
} 