using System.Collections.Generic;

namespace dotnet_backend_api.Models.DTOs
{
    public class UserExamMappingCreateDto
    {
        public string UserId { get; set; } = null!;
        public string ExamId { get; set; } = null!;
        public List<string> Documents { get; set; } = new();
    }
} 