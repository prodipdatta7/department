using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace dotnet_backend_api.Models.Entities
{
    public class Department
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Name { get; set; } = null!;
        public string Code { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
} 