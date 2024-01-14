using Microsoft.EntityFrameworkCore;

namespace aspnetserver.Data
{
    // static class for minimal web api endpoints to perform database CRUD operation.
    internal static class PostsRepository
    {
        // @GET - read operation to get all the posts.
        internal async static Task<List<Post>> GetPostsAsync()
        {
            using (var db = new AppDBContext())
            {
                return await db.Posts.ToListAsync();
            }
        }


        // @GET - read operation to get the posts by id.
        internal async static Task<Post> GetPostByIdAsync(int postId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Posts.FirstOrDefaultAsync(post => post.PostId == postId);
            }
        }


        // @POST - post operation to add new post to the database.
        internal async static Task<bool> CreatePostAsync(Post postToCreate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    // if true, add new post.
                    await db.Posts.AddAsync(postToCreate);

                    // persists the addded post to the database.
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    // if false, no post added.
                    return false;
                }
            }
        }


        // @PUT - put operation to update an existing post to the database.
        internal async static Task<bool> UpdatePostAsync(Post postToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    // if true, update the existing post.
                    db.Posts.Update(postToUpdate);

                    // persists the updated existing post to the database.
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    // if false, no post updated.
                    return false;
                }
            }
        }


        // @DELETE - delete operation to delete a post from the database.
        internal async static Task<bool> DeletePostAsync(int postId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    // intialise variable and set to post by id.
                    Post postToDelete = await GetPostByIdAsync(postId);

                    // delete the post by id.
                    db.Remove(postToDelete);

                    // persists the deleted post from the database.
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    // if false, no post deleted.
                    return false;
                }
            }
        }
    }
}
