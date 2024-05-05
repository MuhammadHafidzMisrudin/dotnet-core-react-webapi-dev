using aspnetserver.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// setup and enable cors policy.
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy", builder =>
    {
        builder
        .AllowAnyMethod()
        .AllowAnyHeader()
        .WithOrigins("http://localhost:3000", "https://appname.azurestaticapps.net");
    });
});

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

// apply to allow .net use cors policy.
app.UseCors("CORSPolicy");


/*
    create web api endpoints.
*/
// add endpoint to get all posts.
app.MapGet("/get-all-posts", async () =>
    await PostsRepository.GetPostsAsync()).WithTags("Posts Endpoints");


// add endpoint to get post by id.
app.MapGet("/get-post-by-id/{postId}", async (int postId) =>
{
    try
    {
        Post postToReturn = await PostsRepository.GetPostByIdAsync(postId);

        if (postToReturn != null)
        {
            return Results.Ok(postToReturn);
        }
        else
        {
            return Results.BadRequest();
        }
    }
    catch (Exception ex)
    {
        return Results.Ok(new { ErrorMessage = ex.Message });
    }
}).WithTags("Posts Endpoints");


// add endpoint to create post.
app.MapPost("/create-post", async (Post postToCreate) =>
{
    try
    {
        bool createSuccessful = await PostsRepository.CreatePostAsync(postToCreate);

        if (createSuccessful)
        {
            return Results.Ok("Create Post Successful..." );
        }
        else
        {
            return Results.BadRequest();
        }
    }
    catch (Exception ex)
    {
        return Results.Ok(new { ErrorMessage = ex.Message });
    }
}).WithTags("Posts Endpoints");


// add endpoint to update post.
app.MapPut("/update-post", async (Post postToUpdate) =>
{
    try
    {
        bool updateSuccessful = await PostsRepository.UpdatePostAsync(postToUpdate);

        if (updateSuccessful)
        {
            return Results.Ok("Update Post Successful...");
        }
        else
        {
            return Results.BadRequest();
        }
    }
    catch (Exception ex)
    {
        return Results.Ok(new { ErrorMessage = ex.Message });
    }
}).WithTags("Posts Endpoints");


// add endpoint to delete post.
app.MapDelete("/delete-post-by-id/{postId}", async (int postId) =>
{
    try
    {
        bool deleteSuccessful = await PostsRepository.DeletePostAsync(postId);

        if (deleteSuccessful)
        {
            return Results.Ok("Delete Post Successful...");
        }
        else
        {
            return Results.BadRequest();
        }
    }
    catch (Exception ex)
    {
        return Results.Ok(new { ErrorMessage = ex.Message });
    }
}).WithTags("Posts Endpoints");

app.Run();