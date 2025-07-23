using dotnet_backend_api.Models.DTOs;
using dotnet_backend_api.Models.Entities;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace dotnet_backend_api.Services
{
    public class ExamService : IExamService
    {
        private readonly IMongoCollection<Exam> _exams;

        public ExamService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("MongoDb"));
            var database = client.GetDatabase(configuration["MongoDbDatabase"] ?? "department");
            _exams = database.GetCollection<Exam>("exams");
        }

        public async Task<List<ExamDto>> GetAllAsync()
        {
            var exams = await _exams.Find(_ => true).ToListAsync();
            return exams.Select(ToDto).ToList();
        }

        public async Task<ExamDto?> GetByIdAsync(string id)
        {
            var exam = await _exams.Find(x => x.Id == id).FirstOrDefaultAsync();
            return exam == null ? null : ToDto(exam);
        }

        public async Task<ExamDto> CreateAsync(ExamCreateDto dto)
        {
            var exam = new Exam
            {
                ExamName = dto.ExamName,
                Semester = dto.Semester,
                Year = dto.Year,
                ExamDate = dto.ExamDate,
                RegistrationOpenDate = dto.RegistrationOpenDate,
                RegistrationCloseDate = dto.RegistrationCloseDate,
                ExamCentre = dto.ExamCentre,
                Status = dto.Status,
                Fees = dto.Fees,
                Courses = dto.Courses,
                RegisteredStudents = dto.RegisteredStudents,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            await _exams.InsertOneAsync(exam);
            return ToDto(exam);
        }

        public async Task<bool> UpdateAsync(string id, ExamCreateDto dto)
        {
            var update = Builders<Exam>.Update
                .Set(x => x.ExamName, dto.ExamName)
                .Set(x => x.Semester, dto.Semester)
                .Set(x => x.Year, dto.Year)
                .Set(x => x.ExamDate, dto.ExamDate)
                .Set(x => x.RegistrationOpenDate, dto.RegistrationOpenDate)
                .Set(x => x.RegistrationCloseDate, dto.RegistrationCloseDate)
                .Set(x => x.ExamCentre, dto.ExamCentre)
                .Set(x => x.Status, dto.Status)
                .Set(x => x.Fees, dto.Fees)
                .Set(x => x.Courses, dto.Courses)
                .Set(x => x.RegisteredStudents, dto.RegisteredStudents)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);
            var result = await _exams.UpdateOneAsync(x => x.Id == id, update);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _exams.DeleteOneAsync(x => x.Id == id);
            return result.DeletedCount > 0;
        }

        private static ExamDto ToDto(Exam exam) => new ExamDto
        {
            Id = exam.Id!,
            ExamName = exam.ExamName,
            Semester = exam.Semester,
            Year = exam.Year,
            ExamDate = exam.ExamDate,
            RegistrationOpenDate = exam.RegistrationOpenDate,
            RegistrationCloseDate = exam.RegistrationCloseDate,
            ExamCentre = exam.ExamCentre,
            Status = exam.Status,
            Fees = exam.Fees,
            Courses = exam.Courses,
            RegisteredStudents = exam.RegisteredStudents,
            CreatedAt = exam.CreatedAt,
            UpdatedAt = exam.UpdatedAt
        };
    }
} 