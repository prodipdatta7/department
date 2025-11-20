using dotnet_backend_api.Models.DTOs;
using dotnet_backend_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dotnet_backend_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class DepartmentAdmissionRecordController : ControllerBase
    {
        private readonly IDepartmentAdmissionRecordService _service;
        public DepartmentAdmissionRecordController(IDepartmentAdmissionRecordService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<DepartmentAdmissionRecordDto>>> GetAll()
        {
            var records = await _service.GetAllAsync();
            return Ok(records);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentAdmissionRecordDto>> GetById(string id)
        {
            var record = await _service.GetByIdAsync(id);
            if (record == null) return NotFound();
            return Ok(record);
        }

        [HttpPost]
        public async Task<ActionResult<DepartmentAdmissionRecordDto>> Create(DepartmentAdmissionRecordCreateDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, DepartmentAdmissionRecordCreateDto dto)
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