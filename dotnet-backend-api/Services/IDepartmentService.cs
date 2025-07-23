using dotnet_backend_api.Models.DTOs;

namespace dotnet_backend_api.Services
{
    public interface IDepartmentService
    {
        Task<List<DepartmentDto>> GetAllAsync();
        Task<DepartmentDto?> GetByIdAsync(string id);
        Task<DepartmentDto> CreateAsync(DepartmentCreateDto dto);
        Task<bool> UpdateAsync(string id, DepartmentCreateDto dto);
        Task<bool> DeleteAsync(string id);
    }
} 