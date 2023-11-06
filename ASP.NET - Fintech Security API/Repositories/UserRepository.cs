using ASP.NET___Fintech_API.Models;

namespace ASP.NET___Fintech_API.Repositories
{
    public class UserRepository : IFirestoreRepository<UserClass>
    {
        private readonly string _collectionName = "users";
        private readonly FirestoreRepository _firestoreRepository;

        public UserRepository() => _firestoreRepository = new FirestoreRepository(_collectionName);

        public List<UserClass> GetAll()
        {
            try
            {
                List<UserClass> users = _firestoreRepository.GetAll<UserClass>();
                return users;
            }
            catch (Exception ex)
            {
                // Puedes personalizar el manejo de excepciones aquí
                Console.WriteLine("Error en GetAll: " + ex.Message);
                throw; // Puedes relanzar la excepción o manejarla de otra forma si es necesario
            }
        }

        public UserClass Get(UserClass record)
        {
            try
            {
                UserClass user = _firestoreRepository.Get(record) ?? throw new InvalidOperationException("El objeto UserClass no se encontró en Firestore.");
                return user;
            }
            catch (Exception ex)
            {
                // Puedes personalizar el manejo de excepciones aquí
                Console.WriteLine("Error en Get: " + ex.Message);
                throw; // Puedes relanzar la excepción o manejarla de otra forma si es necesario
            }
        }

        public void Create(UserClass record)
        {
            try
            {
                _firestoreRepository.Create(record);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error en Create: " + ex.Message);
                throw;
            }
        }

        public void Update(UserClass record)
        {
            try
            {
                _firestoreRepository.Update(record);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error en Update: " + ex.Message);
                throw;
            }
        }

        public void Delete(UserClass record)
        {
            try
            {
                _firestoreRepository.Delete(record);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error en Delete: " + ex.Message);
                throw;
            }
        }
    }
}
