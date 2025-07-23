using dotnet_backend_api.Models.DTOs;

namespace dotnet_backend_api.Services
{
    public interface IStudentService
    {
        Task<List<StudentDto>> GetAllAsync();
        Task<StudentDto?> GetByIdAsync(string id);
        Task<StudentDto> CreateAsync(StudentCreateDto dto, string? imagePath = null);
        Task<bool> UpdateAsync(string id, StudentCreateDto dto, string? imagePath = null);
        Task<bool> DeleteAsync(string id);
        Task<StudentDto?> LoginAsync(string email, string password);
        Task<StudentDto?> GetByEmailAsync(string email);
        Task<bool> UpdateRegisteredExamsAsync(string id, List<string> participatedExams);
    }
} 