namespace dotnet_backend_api.Models.DTOs
{
    public class DepartmentCreateDto
    {
        public string Name { get; set; } = null!;
        public string Code { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
} 