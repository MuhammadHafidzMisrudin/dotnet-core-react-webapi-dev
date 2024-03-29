﻿using Microsoft.EntityFrameworkCore;

namespace aspnetserver.Data
{
    // to configure entity framework for DB in DBContext class.
    internal sealed class AppDBContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // create a postsToSeed array.
            Post[] postsToSeed = new Post[6];
            for (int i = 1; i <= postsToSeed.Length; i++)
            {
                // store values in postsToSeed array.
                postsToSeed[i - 1] = new Post
                {
                    PostId = i,
                    Title = $"Post {i}",
                    Content = $"This is post {i} and it has some very interesting content. I have liked the video and subscribed."
                };
            }

            modelBuilder.Entity<Post>().HasData(postsToSeed);
        }
    }
}
