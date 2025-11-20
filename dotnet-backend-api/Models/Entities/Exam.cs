using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace dotnet_backend_api.Models.Entities
{
    public class Exam
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string ExamName { get; set; } = null!;
        public string Semester { get; set; } = null!;
        public string Year { get; set; } = null!;
        public DateTime ExamDate { get; set; }
        public DateTime RegistrationOpenDate { get; set; }
        public DateTime RegistrationCloseDate { get; set; }
        public string ExamCentre { get; set; } = null!;
        public string Status { get; set; } = null!;
        public double Fees { get; set; }
        public List<string> Courses { get; set; } = new();
        public List<string> RegisteredStudents { get; set; } = new();
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime CreatedAt { get; set; }
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime UpdatedAt { get; set; }
    }
} 