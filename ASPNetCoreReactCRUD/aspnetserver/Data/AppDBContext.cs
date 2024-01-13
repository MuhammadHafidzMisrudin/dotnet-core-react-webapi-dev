using Microsoft.EntityFrameworkCore;

namespace aspnetserver.Data
{
    // to configure entity framework for DB.
    internal sealed class AppDBContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }
    }
}
