using dotnet_backend_api.Models.DTOs;

namespace dotnet_backend_api.Services
{
    public interface ICourseService
    {
        Task<List<CourseDto>> GetAllAsync();
        Task<CourseDto?> GetByIdAsync(string id);
        Task<CourseDto> CreateAsync(CourseCreateDto dto);
        Task<bool> UpdateAsync(string id, CourseCreateDto dto);
        Task<bool> DeleteAsync(string id);
    }
} 