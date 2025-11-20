using System;
using System.Collections.Generic;

namespace dotnet_backend_api.Models.DTOs
{
    public class UserExamMappingDto
    {
        public string Id { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public string ExamId { get; set; } = null!;
        public List<string> Documents { get; set; } = new();
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
} 