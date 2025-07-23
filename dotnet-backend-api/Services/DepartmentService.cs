using dotnet_backend_api.Models.DTOs;
using dotnet_backend_api.Models.Entities;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace dotnet_backend_api.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IMongoCollection<Department> _departments;

        public DepartmentService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("MongoDb"));
            var database = client.GetDatabase(configuration["MongoDbDatabase"] ?? "department");
            _departments = database.GetCollection<Department>("departments");
        }

        public async Task<List<DepartmentDto>> GetAllAsync()
        {
            var departments = await _departments.Find(_ => true).ToListAsync();
            return departments.Select(ToDto).ToList();
        }

        public async Task<DepartmentDto?> GetByIdAsync(string id)
        {
            var department = await _departments.Find(x => x.Id == id).FirstOrDefaultAsync();
            return department == null ? null : ToDto(department);
        }

        public async Task<DepartmentDto> CreateAsync(DepartmentCreateDto dto)
        {
            var department = new Department
            {
                Name = dto.Name,
                Code = dto.Code,
                Description = dto.Description
            };
            await _departments.InsertOneAsync(department);
            return ToDto(department);
        }

        public async Task<bool> UpdateAsync(string id, DepartmentCreateDto dto)
        {
            var update = Builders<Department>.Update
                .Set(x => x.Name, dto.Name)
                .Set(x => x.Code, dto.Code)
                .Set(x => x.Description, dto.Description);
            var result = await _departments.UpdateOneAsync(x => x.Id == id, update);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _departments.DeleteOneAsync(x => x.Id == id);
            return result.DeletedCount > 0;
        }

        private static DepartmentDto ToDto(Department department) => new DepartmentDto
        {
            Id = department.Id!,
            Name = department.Name,
            Code = department.Code,
            Description = department.Description
        };
    }
} 