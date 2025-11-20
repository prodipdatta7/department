using dotnet_backend_api.Models.DTOs;
using dotnet_backend_api.Models.Entities;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace dotnet_backend_api.Services
{
    public class DepartmentAdmissionRecordService : IDepartmentAdmissionRecordService
    {
        private readonly IMongoCollection<DepartmentAdmissionRecord> _records;

        public DepartmentAdmissionRecordService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetConnectionString("MongoDb"));
            var database = client.GetDatabase(configuration["MongoDbDatabase"] ?? "department");
            _records = database.GetCollection<DepartmentAdmissionRecord>("departmentAdmissionRecords");
        }

        public async Task<List<DepartmentAdmissionRecordDto>> GetAllAsync()
        {
            var records = await _records.Find(_ => true).ToListAsync();
            return records.Select(ToDto).ToList();
        }

        public async Task<DepartmentAdmissionRecordDto?> GetByIdAsync(string id)
        {
            var record = await _records.Find(x => x.Id == id).FirstOrDefaultAsync();
            return record == null ? null : ToDto(record);
        }

        public async Task<DepartmentAdmissionRecordDto> CreateAsync(DepartmentAdmissionRecordCreateDto dto)
        {
            var record = new DepartmentAdmissionRecord
            {
                DeptName = dto.DeptName,
                StudentId = dto.StudentId,
                FathersName = dto.FathersName,
                SSCYear = dto.SSCYear,
                HSCYear = dto.HSCYear,
                SSCGPA = dto.SSCGPA,
                HSCGPA = dto.HSCGPA,
                SchoolName = dto.SchoolName,
                CollegeName = dto.CollegeName,
                SchoolBoardName = dto.SchoolBoardName,
                CollegeBoardname = dto.CollegeBoardname,
                Session = dto.Session,
                Class = dto.Class,
                Semester = dto.Semester,
                MajorCourses = dto.MajorCourses,
                NonMajorCourses = dto.NonMajorCourses,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            await _records.InsertOneAsync(record);
            return ToDto(record);
        }

        public async Task<bool> UpdateAsync(string id, DepartmentAdmissionRecordCreateDto dto)
        {
            var update = Builders<DepartmentAdmissionRecord>.Update
                .Set(x => x.DeptName, dto.DeptName)
                .Set(x => x.StudentId, dto.StudentId)
                .Set(x => x.FathersName, dto.FathersName)
                .Set(x => x.SSCYear, dto.SSCYear)
                .Set(x => x.HSCYear, dto.HSCYear)
                .Set(x => x.SSCGPA, dto.SSCGPA)
                .Set(x => x.HSCGPA, dto.HSCGPA)
                .Set(x => x.SchoolName, dto.SchoolName)
                .Set(x => x.CollegeName, dto.CollegeName)
                .Set(x => x.SchoolBoardName, dto.SchoolBoardName)
                .Set(x => x.CollegeBoardname, dto.CollegeBoardname)
                .Set(x => x.Session, dto.Session)
                .Set(x => x.Class, dto.Class)
                .Set(x => x.Semester, dto.Semester)
                .Set(x => x.MajorCourses, dto.MajorCourses)
                .Set(x => x.NonMajorCourses, dto.NonMajorCourses)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);
            var result = await _records.UpdateOneAsync(x => x.Id == id, update);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _records.DeleteOneAsync(x => x.Id == id);
            return result.DeletedCount > 0;
        }

        private static DepartmentAdmissionRecordDto ToDto(DepartmentAdmissionRecord record) => new DepartmentAdmissionRecordDto
        {
            Id = record.Id!,
            DeptName = record.DeptName,
            StudentId = record.StudentId,
            FathersName = record.FathersName,
            SSCYear = record.SSCYear,
            HSCYear = record.HSCYear,
            SSCGPA = record.SSCGPA,
            HSCGPA = record.HSCGPA,
            SchoolName = record.SchoolName,
            CollegeName = record.CollegeName,
            SchoolBoardName = record.SchoolBoardName,
            CollegeBoardname = record.CollegeBoardname,
            Session = record.Session,
            Class = record.Class,
            Semester = record.Semester,
            MajorCourses = record.MajorCourses,
            NonMajorCourses = record.NonMajorCourses,
            CreatedAt = record.CreatedAt,
            UpdatedAt = record.UpdatedAt
        };
    }
} 