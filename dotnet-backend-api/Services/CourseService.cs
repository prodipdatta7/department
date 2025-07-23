using dotnet_backend_api.Models.DTOs;
using dotnet_backend_api.Models.Entities;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace dotnet_backend_api.Services
{
    public class CourseService : ICourseService
    {
        private readonly IMongoCollection<Course> _courses;

        public CourseService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("MongoDb"));
            var database = client.GetDatabase(configuration["MongoDbDatabase"] ?? "department");
            _courses = database.GetCollection<Course>("courses");
        }

        public async Task<List<CourseDto>> GetAllAsync()
        {
            var courses = await _courses.Find(_ => true).ToListAsync();
            return courses.Select(ToDto).ToList();
        }

        public async Task<CourseDto?> GetByIdAsync(string id)
        {
            var course = await _courses.Find(x => x.Id == id).FirstOrDefaultAsync();
            return course == null ? null : ToDto(course);
        }

        public async Task<CourseDto> CreateAsync(CourseCreateDto dto)
        {
            var course = new Course
            {
                Name = dto.Name,
                Code = dto.Code,
                Department = dto.Department,
                Credits = dto.Credits
            };
            await _courses.InsertOneAsync(course);
            return ToDto(course);
        }

        public async Task<bool> UpdateAsync(string id, CourseCreateDto dto)
        {
            var update = Builders<Course>.Update
                .Set(x => x.Name, dto.Name)
                .Set(x => x.Code, dto.Code)
                .Set(x => x.Department, dto.Department)
                .Set(x => x.Credits, dto.Credits);
            var result = await _courses.UpdateOneAsync(x => x.Id == id, update);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _courses.DeleteOneAsync(x => x.Id == id);
            return result.DeletedCount > 0;
        }

        private static CourseDto ToDto(Course course) => new CourseDto
        {
            Id = course.Id!,
            Name = course.Name,
            Code = course.Code,
            Department = course.Department,
            Credits = course.Credits
        };
    }
} 