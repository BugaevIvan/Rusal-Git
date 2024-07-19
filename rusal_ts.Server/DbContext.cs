using Microsoft.EntityFrameworkCore;
using rusal.Server.DAL.Entities;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Pass> Passes { get; set; } = null!;

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>().HasData(new User
        {
            Id = Guid.NewGuid(),
            Username = "admin",
            PasswordHash = "$2a$11$dPXdFwxoU/poSCAwtYwYPeb5sapv4U4eWF7Cdpc/Jjwqje4bIc9eW"
        });
        modelBuilder.Entity<Pass>().HasData(new Pass
        {
            PassId = Guid.NewGuid(),
            DateApply = new DateTime(2023, 12, 28, 21, 10, 55),
            Number = "2023-12-1",
            Status = "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u0435\u043d",
            Type = "\u041f\u043e\u0441\u0442\u043e\u044f\u043d\u043d\u044b\u0439",
            TypePeriod = "\u0420\u0430\u0437\u043e\u0432\u044b\u0439",
            Organization = "\u0421\u0424\u0423",
            Comment = "\u0423\u0440\u0430 #1",
            Dateto = new DateOnly(2023, 12, 08),
            Datefrom = new DateOnly(2023, 12, 04)
        }, new Pass
        {
            PassId = Guid.NewGuid(),
            DateApply = new DateTime(2023, 12, 28, 21, 11, 42),
            Number = "2023-12-2",
            Status = "\u041f\u0440\u043e\u0441\u0440\u043e\u0447\u0435\u043d",
            Type = "\u0412\u0440\u0435\u043c\u0435\u043d\u043d\u044b\u0439",
            TypePeriod = "\u0420\u0430\u0437\u043e\u0432\u044b\u0439",
            Organization = "\u0420\u0423\u0421\u0410\u041b #2",
            Comment = "\u0421\u0443\u043f\u0435\u0440",
            Dateto = new DateOnly(2023, 12, 17),
            Datefrom = new DateOnly(2023, 12, 08)
        }, new Pass
        {
            PassId = Guid.NewGuid(),
            DateApply = new DateTime(2023, 12, 28, 22, 23, 38),
            Number = "2023-12-3",
            Status = "\u041f\u0440\u0438\u043e\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d",
            Type = "\u0412\u0440\u0435\u043c\u0435\u043d\u043d\u044b\u0439",
            TypePeriod = "\u0420\u0430\u0437\u043e\u0432\u044b\u0439",
            Organization = "\u0425\u0430\u0431\u0440 + StackOverFlow",
            Comment = "\u0422\u041e\u041f \u21161",
            Dateto = new DateOnly(2023, 12, 31),
            Datefrom = new DateOnly(2023, 12, 30)
        }, new Pass
        {
            PassId = Guid.NewGuid(),
            DateApply = new DateTime(2023, 12, 28, 22, 25, 55),
            Number = "2023-12-4",
            Status = "\u0418\u0437\u044a\u044f\u0442",
            Type = "\u0420\u0430\u0437\u043e\u0432\u044b\u0439",
            TypePeriod = "\u0420\u0430\u0437\u043e\u0432\u044b\u0439",
            Organization = "Apple",
            Comment = "Best",
            Dateto = new DateOnly(2023, 12, 31),
            Datefrom = new DateOnly(2023, 12, 30)
        }, new Pass
        {
            PassId = Guid.NewGuid(),
            DateApply = new DateTime(2023, 12, 29, 00, 22, 50),
            Number = "2023-12-5",
            Status = "\u041f\u0440\u0438\u043e\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d",
            Type = "\u041f\u043e\u0441\u0442\u043e\u044f\u043d\u043d\u044b\u0439",
            TypePeriod = "\u0420\u0430\u0437\u043e\u0432\u044b\u0439",
            Organization = "Sony",
            Comment = "Awesome #1",
            Dateto = new DateOnly(2023, 12, 30),
            Datefrom = new DateOnly(2023, 12, 29)
        }
        );
    }
}
