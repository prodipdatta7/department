using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace dotnet_backend_api.Policy
{
    public class CourseAccessHandler : AuthorizationHandler<CourseAccessRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, CourseAccessRequirement requirement)
        {
            var httpContext = (context.Resource as Microsoft.AspNetCore.Mvc.Filters.AuthorizationFilterContext)?.HttpContext;
            if (httpContext == null)
                return Task.CompletedTask;

            // Get courseId from route
            var courseId = httpContext.Request.RouteValues["id"]?.ToString();
            if (string.IsNullOrEmpty(courseId))
                return Task.CompletedTask;

            var requiredRole = $"student-course_{courseId}";
            if (context.User.IsInRole(requiredRole) || context.User.IsInRole("Admin") || context.User.IsInRole("Teacher"))
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
} 