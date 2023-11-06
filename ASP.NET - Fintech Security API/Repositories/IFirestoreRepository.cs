namespace ASP.NET___Fintech_API.Repositories
{
    public interface IFirestoreRepository<T>
    {
        T Get(T record);
    }
}