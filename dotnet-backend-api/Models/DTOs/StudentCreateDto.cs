using System;
using System.Collections.Generic;

namespace dotnet_backend_api.Models.DTOs
{
    public class StudentCreateDto
    {
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
        public List<AcademicInfoDto> AcademicInfo { get; set; } = new();
        public List<string> Courses { get; set; } = new();
        public List<string> ParticipatedExams { get; set; } = new();
        public List<string> Roles { get; set; } = new();
    }
} 