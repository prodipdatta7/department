using dotnet_backend_api.Models.DTOs;

namespace dotnet_backend_api.Services
{
    public interface IExamService
    {
        Task<List<ExamDto>> GetAllAsync();
        Task<ExamDto?> GetByIdAsync(string id);
        Task<ExamDto> CreateAsync(ExamCreateDto dto);
        Task<bool> UpdateAsync(string id, ExamCreateDto dto);
        Task<bool> DeleteAsync(string id);
    }
} 