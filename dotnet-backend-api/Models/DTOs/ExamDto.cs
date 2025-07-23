namespace dotnet_backend_api.Models.DTOs
{
    public class ExamDto
    {
        public string Id { get; set; } = null!;
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
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
} 