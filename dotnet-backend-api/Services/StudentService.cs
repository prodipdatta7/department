using dotnet_backend_api.Models.DTOs;
using dotnet_backend_api.Models.Entities;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace dotnet_backend_api.Services
{
    public class StudentService : IStudentService
    {
        private readonly IMongoCollection<Student> _students;
        private readonly IConfiguration _configuration;

        public StudentService(IConfiguration configuration)
        {
            _configuration = configuration;
            var client = new MongoClient(configuration.GetConnectionString("MongoDb"));
            var database = client.GetDatabase(configuration["MongoDbDatabase"] ?? "department");
            _students = database.GetCollection<Student>("students");
        }

        public async Task<List<StudentDto>> GetAllAsync()
        {
            var students = await _students.Find(_ => true).ToListAsync();
            return students.Select(ToDto).ToList();
        }

        public async Task<StudentDto?> GetByIdAsync(string id)
        {
            var student = await _students.Find(x => x.Id == id).FirstOrDefaultAsync();
            return student == null ? null : ToDto(student);
        }

        public async Task<StudentDto> CreateAsync(StudentCreateDto dto, string? imagePath = null)
        {
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            var student = new Student
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = hashedPassword,
                StudentId = dto.StudentId,
                Phone = dto.Phone,
                Department = dto.Department,
                Semester = dto.Semester,
                Session = dto.Session,
                ImagePath = imagePath ?? dto.ImagePath,
                Address = dto.Address,
                IsAdmin = dto.IsAdmin,
                FatherName = dto.FatherName,
                MotherName = dto.MotherName,
                GuardianName = dto.GuardianName,
                Village = dto.Village,
                PostOffice = dto.PostOffice,
                SubDistrict = dto.SubDistrict,
                District = dto.District,
                Nationality = dto.Nationality,
                Religion = dto.Religion,
                HallName = dto.HallName,
                BirthDate = dto.BirthDate,
                AcademicInfo = dto.AcademicInfo.Select(ToEntity).ToList(),
                Courses = dto.Courses,
                ParticipatedExams = dto.ParticipatedExams,
                Roles = dto.Roles != null && dto.Roles.Count > 0 ? dto.Roles : new List<string> { "Student" },
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            await _students.InsertOneAsync(student);
            return ToDto(student);
        }

        public async Task<bool> UpdateAsync(string id, StudentCreateDto dto, string? imagePath = null)
        {
            var update = Builders<Student>.Update
                .Set(x => x.Name, dto.Name)
                .Set(x => x.Email, dto.Email)
                .Set(x => x.Password, BCrypt.Net.BCrypt.HashPassword(dto.Password))
                .Set(x => x.StudentId, dto.StudentId)
                .Set(x => x.Phone, dto.Phone)
                .Set(x => x.Department, dto.Department)
                .Set(x => x.Semester, dto.Semester)
                .Set(x => x.Session, dto.Session)
                .Set(x => x.ImagePath, imagePath ?? dto.ImagePath)
                .Set(x => x.Address, dto.Address)
                .Set(x => x.IsAdmin, dto.IsAdmin)
                .Set(x => x.FatherName, dto.FatherName)
                .Set(x => x.MotherName, dto.MotherName)
                .Set(x => x.GuardianName, dto.GuardianName)
                .Set(x => x.Village, dto.Village)
                .Set(x => x.PostOffice, dto.PostOffice)
                .Set(x => x.SubDistrict, dto.SubDistrict)
                .Set(x => x.District, dto.District)
                .Set(x => x.Nationality, dto.Nationality)
                .Set(x => x.Religion, dto.Religion)
                .Set(x => x.HallName, dto.HallName)
                .Set(x => x.BirthDate, dto.BirthDate)
                .Set(x => x.AcademicInfo, dto.AcademicInfo.Select(ToEntity).ToList())
                .Set(x => x.Courses, dto.Courses)
                .Set(x => x.ParticipatedExams, dto.ParticipatedExams)
                .Set(x => x.Roles, dto.Roles != null && dto.Roles.Count > 0 ? dto.Roles : new List<string> { "Student" })
                .Set(x => x.UpdatedAt, DateTime.UtcNow);
            var result = await _students.UpdateOneAsync(x => x.Id == id, update);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _students.DeleteOneAsync(x => x.Id == id);
            return result.DeletedCount > 0;
        }

        public async Task<StudentDto?> LoginAsync(string email, string password)
        {
            var student = await _students.Find(x => x.Email == email).FirstOrDefaultAsync();
            if (student == null) return null;
            var isValid = BCrypt.Net.BCrypt.Verify(password, student.Password);
            return isValid ? ToDto(student) : null;
        }

        public async Task<StudentDto?> GetByEmailAsync(string email)
        {
            var student = await _students.Find(x => x.Email == email).FirstOrDefaultAsync();
            return student == null ? null : ToDto(student);
        }

        public async Task<bool> UpdateRegisteredExamsAsync(string id, List<string> participatedExams)
        {
            var update = Builders<Student>.Update
                .Set(x => x.ParticipatedExams, participatedExams)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);
            var result = await _students.UpdateOneAsync(x => x.Id == id, update);
            return result.ModifiedCount > 0;
        }

        private static StudentDto ToDto(Student student) => new StudentDto
        {
            Id = student.Id!,
            Name = student.Name,
            Email = student.Email,
            StudentId = student.StudentId,
            Phone = student.Phone,
            Department = student.Department,
            Semester = student.Semester,
            Session = student.Session,
            ImagePath = student.ImagePath,
            Address = student.Address,
            IsAdmin = student.IsAdmin,
            FatherName = student.FatherName,
            MotherName = student.MotherName,
            GuardianName = student.GuardianName,
            Village = student.Village,
            PostOffice = student.PostOffice,
            SubDistrict = student.SubDistrict,
            District = student.District,
            Nationality = student.Nationality,
            Religion = student.Religion,
            HallName = student.HallName,
            BirthDate = student.BirthDate,
            AcademicInfo = student.AcademicInfo.Select(ai => new AcademicInfoDto
            {
                ExamName = ai.ExamName,
                PassingYear = ai.PassingYear,
                Institute = ai.Institute,
                Board = ai.Board,
                ExamRoll = ai.ExamRoll,
                GPA = ai.GPA
            }).ToList(),
            Courses = student.Courses,
            ParticipatedExams = student.ParticipatedExams,
            Roles = student.Roles,
            CreatedAt = student.CreatedAt,
            UpdatedAt = student.UpdatedAt
        };

        private static AcademicInfo ToEntity(AcademicInfoDto dto) => new AcademicInfo
        {
            ExamName = dto.ExamName,
            PassingYear = dto.PassingYear,
            Institute = dto.Institute,
            Board = dto.Board,
            ExamRoll = dto.ExamRoll,
            GPA = dto.GPA
        };
    }
} 