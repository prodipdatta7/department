using dotnet_backend_api.Policy;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Register CourseService
builder.Services.AddScoped<dotnet_backend_api.Services.ICourseService, dotnet_backend_api.Services.CourseService>();
// Register DepartmentService
builder.Services.AddScoped<dotnet_backend_api.Services.IDepartmentService, dotnet_backend_api.Services.DepartmentService>();
// Register ExamService
builder.Services.AddScoped<dotnet_backend_api.Services.IExamService, dotnet_backend_api.Services.ExamService>();
// Register StudentService
builder.Services.AddScoped<dotnet_backend_api.Services.IStudentService, dotnet_backend_api.Services.StudentService>();
// Register JwtService
builder.Services.AddSingleton<dotnet_backend_api.Services.JwtService>();
// Register UserExamMappingService
builder.Services.AddScoped<dotnet_backend_api.Services.IUserExamMappingService, dotnet_backend_api.Services.UserExamMappingService>();
// Register PdfService
builder.Services.AddSingleton<dotnet_backend_api.Services.PdfService>();
// Register DepartmentAdmissionRecordService
builder.Services.AddScoped<dotnet_backend_api.Services.IDepartmentAdmissionRecordService, dotnet_backend_api.Services.DepartmentAdmissionRecordService>();

// Add JWT authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!)),
        ClockSkew = TimeSpan.Zero
    };
});

// Add authorization policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CourseAccess", policy =>
        policy.Requirements.Add(new CourseAccessRequirement()));
});
builder.Services.AddSingleton<IAuthorizationHandler, CourseAccessHandler>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});
var app = builder.Build();

// Enable Swagger UI in all environments
app.UseSwagger();
app.UseSwaggerUI();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseStaticFiles(); // Serve wwwroot for image uploads

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
