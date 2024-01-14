using aspnetserver.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "ASP.NET Core React Web APIs", Version = "v1" });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions =>
{
    swaggerUIOptions.DocumentTitle = "ASP.NET Core React Web APIs";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web APIs serving a simple Post model.");
    swaggerUIOptions.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

/*
    create web apis.
*/

// add endpoint to get all posts.
app.MapGet("/get-all-posts", async () =>
    await PostsRepository.GetPostsAsync()).WithTags("Posts Endpoints");

app.Run();