using Microsoft.EntityFrameworkCore;

namespace aspnetserver.Data
{
    /// <summary>
    /// Represents the Entity Framework Core database context for the application.
    /// Manages database configuration and entity model creation for the SQLite database.
    /// </summary>
    internal sealed class AppDBContext : DbContext
    {
        /// <summary>
        /// Gets or sets the <see cref="DbSet{Post}"/> used to query and save <see cref="Post"/> entities.
        /// </summary>
        public DbSet<Post> Posts { get; set; }

        /// <summary>
        /// Configures the database provider and connection string for this context.
        /// Uses SQLite with a local database file located at <c>./Data/AppDB.db</c>.
        /// </summary>
        /// <param name="dbContextOptionsBuilder">The builder used to configure the database context options.</param>
        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");

        /// <summary>
        /// Configures the entity model and seeds the database with initial <see cref="Post"/> data.
        /// This method is called by the framework when the model for this context is being created.
        /// </summary>
        /// <param name="modelBuilder">The builder used to construct the model for this context.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // allocate an array to hold 6 Post entities to be seeded into the database.
            Post[] postsToSeed = new Post[6];

            // populate each element with a unique PostId, Title, and default Content.
            for (int i = 1; i <= postsToSeed.Length; i++)
            {
                postsToSeed[i - 1] = new Post
                {
                    PostId = i,
                    Title = $"Post {i}",
                    Content = $"This is post {i} and it has some very interesting content. I have liked the video and subscribed."
                };
            }

            // register the seed data with EF Core; records are inserted on database creation/migration.
            modelBuilder.Entity<Post>().HasData(postsToSeed);
        }
    }
}
