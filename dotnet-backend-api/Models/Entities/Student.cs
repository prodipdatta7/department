using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace dotnet_backend_api.Models.Entities
{
    public class Student
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string StudentId { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Department { get; set; } = null!;
        public string Semester { get; set; } = null!;
        public string Session { get; set; } = null!;
        public string? ImagePath { get; set; }
        public string? Address { get; set; }
        public bool IsAdmin { get; set; } = false;
        public string? FatherName { get; set; }
        public string? MotherName { get; set; }
        public string? GuardianName { get; set; }
        public string? Village { get; set; }
        public string? PostOffice { get; set; }
        public string? SubDistrict { get; set; }
        public string? District { get; set; }
        public string? Nationality { get; set; }
        public string? Religion { get; set; }
        public string? HallName { get; set; }
        public DateTime? BirthDate { get; set; }
        public List<AcademicInfo> AcademicInfo { get; set; } = new();
        public List<string> Courses { get; set; } = new();
        public List<string> ParticipatedExams { get; set; } = new();
        public List<string> Roles { get; set; } = new();
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime CreatedAt { get; set; }
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime UpdatedAt { get; set; }
    }
    public class AcademicInfo
    {
        public string? ExamName { get; set; }
        public int? PassingYear { get; set; }
        public string? Institute { get; set; }
        public string? Board { get; set; }
        public string? ExamRoll { get; set; }
        public string? GPA { get; set; }
    }
} 