namespace dotnet_backend_api.Models.DTOs
{
    public class CourseDto
    {
        public string Id { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Code { get; set; } = null!;
        public string Department { get; set; } = null!;
        public int Credits { get; set; }
    }
} 