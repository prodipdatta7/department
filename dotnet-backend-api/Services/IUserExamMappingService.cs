using dotnet_backend_api.Models.DTOs;

namespace dotnet_backend_api.Services
{
    public interface IUserExamMappingService
    {
        Task<List<UserExamMappingDto>> GetAllAsync();
        Task<UserExamMappingDto?> GetByIdAsync(string id);
        Task<UserExamMappingDto> CreateAsync(UserExamMappingCreateDto dto);
        Task<bool> UpdateAsync(string id, UserExamMappingCreateDto dto);
        Task<bool> DeleteAsync(string id);
        Task<List<UserExamMappingDto>> GetDocumentsByUserIdAsync(string userId);
    }
} 