using ASP.NET___Fintech_API.Models;

namespace ASP.NET___Fintech_API.Repositories
{
    public class BankRepository : IFirestoreRepository<BankClass>
    {
        private readonly string _collectionName = "banks";
        private readonly FirestoreRepository _firestoreRepository;

        public BankRepository() => _firestoreRepository = new FirestoreRepository(_collectionName);

        public List<BankClass> GetAll()
        {
            try
            {
                List<BankClass> banks = _firestoreRepository.GetAll<BankClass>();
                return banks;
            }
            catch (Exception ex)
            {
                // Puedes personalizar el manejo de excepciones aquí
                Console.WriteLine("Error en GetAll: " + ex.Message);
                throw; // Puedes relanzar la excepción o manejarla de otra forma si es necesario
            }
        }

        public BankClass Get(BankClass record)
        {
            try
            {
                BankClass bank = _firestoreRepository.Get(record) ?? throw new InvalidOperationException("El objeto BankClass no se encontró en Firestore.");
                return bank;
            }
            catch (Exception ex)
            {
                // Puedes personalizar el manejo de excepciones aquí
                Console.WriteLine("Error en Get: " + ex.Message);
                throw; // Puedes relanzar la excepción o manejarla de otra forma si es necesario
            }
        }

        public void Create(BankClass record)
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

        public void Update(BankClass record)
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

        public void Delete(BankClass record)
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
