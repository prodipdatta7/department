using dotnet_backend_api.Models.DTOs;
using dotnet_backend_api.Models.Entities;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace dotnet_backend_api.Services
{
    public class UserExamMappingService : IUserExamMappingService
    {
        private readonly IMongoCollection<UserExamMapping> _mappings;

        public UserExamMappingService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("MongoDb"));
            var database = client.GetDatabase(configuration["MongoDbDatabase"] ?? "department");
            _mappings = database.GetCollection<UserExamMapping>("userExamMappings");
        }

        public async Task<List<UserExamMappingDto>> GetAllAsync()
        {
            var mappings = await _mappings.Find(_ => true).ToListAsync();
            return mappings.Select(ToDto).ToList();
        }

        public async Task<UserExamMappingDto?> GetByIdAsync(string id)
        {
            var mapping = await _mappings.Find(x => x.Id == id).FirstOrDefaultAsync();
            return mapping == null ? null : ToDto(mapping);
        }

        public async Task<UserExamMappingDto> CreateAsync(UserExamMappingCreateDto dto)
        {
            var mapping = new UserExamMapping
            {
                UserId = dto.UserId,
                ExamId = dto.ExamId,
                Documents = dto.Documents,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            await _mappings.InsertOneAsync(mapping);
            return ToDto(mapping);
        }

        public async Task<bool> UpdateAsync(string id, UserExamMappingCreateDto dto)
        {
            var update = Builders<UserExamMapping>.Update
                .Set(x => x.UserId, dto.UserId)
                .Set(x => x.ExamId, dto.ExamId)
                .Set(x => x.Documents, dto.Documents)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);
            var result = await _mappings.UpdateOneAsync(x => x.Id == id, update);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _mappings.DeleteOneAsync(x => x.Id == id);
            return result.DeletedCount > 0;
        }

        public async Task<List<UserExamMappingDto>> GetDocumentsByUserIdAsync(string userId)
        {
            var mappings = await _mappings.Find(x => x.UserId == userId).ToListAsync();
            return mappings.Select(ToDto).ToList();
        }

        private static UserExamMappingDto ToDto(UserExamMapping mapping) => new UserExamMappingDto
        {
            Id = mapping.Id!,
            UserId = mapping.UserId,
            ExamId = mapping.ExamId,
            Documents = mapping.Documents,
            CreatedAt = mapping.CreatedAt,
            UpdatedAt = mapping.UpdatedAt
        };
    }
} 