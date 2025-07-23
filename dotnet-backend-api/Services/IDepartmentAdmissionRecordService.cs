using dotnet_backend_api.Models.DTOs;

namespace dotnet_backend_api.Services
{
    public interface IDepartmentAdmissionRecordService
    {
        Task<List<DepartmentAdmissionRecordDto>> GetAllAsync();
        Task<DepartmentAdmissionRecordDto?> GetByIdAsync(string id);
        Task<DepartmentAdmissionRecordDto> CreateAsync(DepartmentAdmissionRecordCreateDto dto);
        Task<bool> UpdateAsync(string id, DepartmentAdmissionRecordCreateDto dto);
        Task<bool> DeleteAsync(string id);
    }
} 