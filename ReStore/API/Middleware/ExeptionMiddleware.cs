



using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

public class ExeptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExeptionMiddleware> _logger;
    private readonly IWebHostEnvironment _env;

    public ExeptionMiddleware(RequestDelegate next, ILogger<ExeptionMiddleware> logger, IWebHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {

            _logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 500;

            var response = new ProblemDetails
            {
                Status = 500,
                Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString() : null,
                Title = ex.Message
            };
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            var json = JsonSerializer.Serialize(response, options);
            await context.Response.WriteAsync(json);
        }

    }

    // The rest of your middleware class...
}