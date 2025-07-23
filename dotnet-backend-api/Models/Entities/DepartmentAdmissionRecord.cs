using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace dotnet_backend_api.Models.Entities
{
    public class DepartmentAdmissionRecord
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string DeptName { get; set; } = null!;
        public string StudentId { get; set; } = null!;
        public string FathersName { get; set; } = null!;
        public int SSCYear { get; set; }
        public int HSCYear { get; set; }
        public double SSCGPA { get; set; }
        public double HSCGPA { get; set; }
        public string SchoolName { get; set; } = null!;
        public string CollegeName { get; set; } = null!;
        public string SchoolBoardName { get; set; } = null!;
        public string CollegeBoardname { get; set; } = null!;
        public string Session { get; set; } = null!;
        public string Class { get; set; } = null!;
        public string Semester { get; set; } = null!;
        public List<string> MajorCourses { get; set; } = new();
        public List<string> NonMajorCourses { get; set; } = new();
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime CreatedAt { get; set; }
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime UpdatedAt { get; set; }
    }
} 