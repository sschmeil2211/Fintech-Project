using ASP.NET___Fintech_API.Models;

namespace ASP.NET___Fintech_API.Repositories
{
    public class UserBankRepository : IFirestoreRepository<UserBankClass>
    {
        private readonly string _collectionName = "userBanks";
        private readonly FirestoreRepository _firestoreRepository;

        public UserBankRepository() => _firestoreRepository = new FirestoreRepository(_collectionName);

        public List<UserBankClass> GetAll()
        {
            try
            {
                List<UserBankClass> userBanks = _firestoreRepository.GetAll<UserBankClass>();
                return userBanks;
            }
            catch (Exception ex)
            {
                // Puedes personalizar el manejo de excepciones aquí
                Console.WriteLine("Error en GetAll: " + ex.Message);
                throw; // Puedes relanzar la excepción o manejarla de otra forma si es necesario
            }
        }

        public UserBankClass Get(UserBankClass record)
        {
            try
            {
                UserBankClass userBank = _firestoreRepository.Get(record) ?? throw new InvalidOperationException("El objeto UserBankClass no se encontró en Firestore.");
                return userBank;
            }
            catch (Exception ex)
            {
                // Puedes personalizar el manejo de excepciones aquí
                Console.WriteLine("Error en Get: " + ex.Message);
                throw; // Puedes relanzar la excepción o manejarla de otra forma si es necesario
            }
        }

        public List<UserBankClass> GetUserBanksByUserId(string userId)
        {
            try
            {
                // Filtra los UserBanks por userID
                List<UserBankClass> userBanks = _firestoreRepository
                    .GetAll<UserBankClass>()
                    .Where(userBank => userBank.userID == userId)
                    .ToList();
                return userBanks;
            }
            catch (Exception ex)
            {
                // Maneja las excepciones según tus necesidades (registra, lanza, etc.)
                Console.WriteLine("Error al obtener UserBanks por userID: " + ex.Message);
                return new List<UserBankClass>();
            }
        }

        public List<UserBankClass> GetUserBanksByBankId(string bankId)
        {
            try
            {
                // Filtra los UserBanks por bankID
                List<UserBankClass> userBanks = _firestoreRepository
                    .GetAll<UserBankClass>()
                    .Where(userBank => userBank.bankID == bankId)
                    .ToList();
                return userBanks;
            }
            catch (Exception ex)
            {
                // Maneja las excepciones según tus necesidades (registra, lanza, etc.)
                Console.WriteLine("Error al obtener UserBanks por bankID: " + ex.Message);
                return new List<UserBankClass>();
            }
        }

        public void Create(UserBankClass record)
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

        public void Update(UserBankClass record)
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

        public void Delete(UserBankClass record)
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
