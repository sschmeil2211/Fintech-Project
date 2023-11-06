using ASP.NET___Fintech_API.Models;

namespace ASP.NET___Fintech_API.Repositories
{
    public class KeyRepository : IFirestoreRepository<KeyClass>
    {
        private readonly string _collectionName = "keys";
        private readonly FirestoreRepository _firestoreRepository;

        public KeyRepository() => _firestoreRepository = new FirestoreRepository(_collectionName);

        public KeyClass Get(KeyClass record)
        {
            try
            {
                KeyClass key = _firestoreRepository.Get(record) ?? throw new InvalidOperationException("El objeto KeyClass no se encontró en Firestore.");
                return key;
            }
            catch (Exception ex)
            {
                // Puedes personalizar el manejo de excepciones aquí
                Console.WriteLine("Error en Get: " + ex.Message);
                throw; // Puedes relanzar la excepción o manejarla de otra forma si es necesario
            }
        }

        public KeyClass? GetKeyByUserId(string userId)
        {
            try
            {
                // Filtra los UserBanks por userID
                List<KeyClass> userKeys = _firestoreRepository
                    .GetAll<KeyClass>()
                    .Where(userKey => userKey.userId == userId)
                    .ToList();
                return userKeys[0];
            }
            catch (Exception ex)
            {
                // Maneja las excepciones según tus necesidades (registra, lanza, etc.)
                Console.WriteLine("Error al obtener UserBanks por userID: " + ex.Message);
                return null;
            }
        }

        public void Create(KeyClass record)
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

        public void Update(KeyClass record)
        {
            try
            {
                _firestoreRepository.Update(record);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error en Create: " + ex.Message);
                throw;
            }
        }
         
        public void Delete(KeyClass record)
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
