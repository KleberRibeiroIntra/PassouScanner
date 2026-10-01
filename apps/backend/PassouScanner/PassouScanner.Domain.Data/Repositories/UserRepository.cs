using Microsoft.EntityFrameworkCore;
using PassouScanner.Domain.Entities;
using PassouScanner.Domain.Repositories;

namespace PassouScanner.Domain.Data.Repositories;

public class UserRepository : RepositoryBase<User>, IUserRepository
{
    private readonly PassouScannerDbContext _context;

    public UserRepository(PassouScannerDbContext context) : base(context)
    {
        _context = context;
    }

    public Task<User?> GetByEmailAsync(string email) =>
        _context.Set<User>().FirstOrDefaultAsync(u => u.Email == email && u.Active);

    public Task<bool> ExistsByEmailAsync(string email) =>
        _context.Set<User>().AnyAsync(u => u.Email == email && u.Active);
}
