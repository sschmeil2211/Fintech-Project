using ASP.NET___Fintech_API.Models;

namespace ASP.NET___Fintech_API.Repositories
{
    public class TransactionRepository : IFirestoreRepository<TransactionClass>
    {
        private readonly string _collectionName = "transactions";
        private readonly FirestoreRepository _firestoreRepository; 

        public TransactionRepository() => _firestoreRepository = new FirestoreRepository(_collectionName);

        public List<TransactionClass> GetAll()
        {
            try
            {  
                List<TransactionClass> transactions = _firestoreRepository.GetAll<TransactionClass>();
                return transactions;  
            }
            catch (Exception ex)
            {
                // Puedes personalizar el manejo de excepciones aquí
                Console.WriteLine("Error en GetAll: " + ex.Message);
                throw; // Puedes relanzar la excepción o manejarla de otra forma si es necesario
            }
        } 

        public TransactionClass Get(TransactionClass record)
        {
            try
            {
                TransactionClass transaction = _firestoreRepository.Get(record) 
                    ?? throw new InvalidOperationException("El objeto TransactionClass no se encontró en Firestore.");
                return transaction;
            }
            catch (Exception ex)
            {
                // Puedes personalizar el manejo de excepciones aquí
                Console.WriteLine("Error en Get: " + ex.Message);
                throw; // Puedes relanzar la excepción o manejarla de otra forma si es necesario
            }
        }

        public List<TransactionClass> GetTransactionBySenderId(string userId)
        {
            try
            {
                // Filtra los UserBanks por userID
                List<TransactionClass> transactions = _firestoreRepository
                    .GetAll<TransactionClass>()
                    .Where(transaction => transaction.senderUser == userId)
                    .ToList();
                return transactions;
            }
            catch (Exception ex)
            {
                // Maneja las excepciones según tus necesidades (registra, lanza, etc.)
                Console.WriteLine("Error al obtener UserBanks por userID: " + ex.Message);
                return new List<TransactionClass>();
            }
        }

        public List<TransactionClass> GetTransactionByReceiverId(string userId)
        {
            try
            {
                // Filtra los UserBanks por userID
                List<TransactionClass> transactions = _firestoreRepository
                    .GetAll<TransactionClass>()
                    .Where(transaction => transaction.receiverUser == userId)
                    .ToList();
                return transactions;
            }
            catch (Exception ex)
            {
                // Maneja las excepciones según tus necesidades (registra, lanza, etc.)
                Console.WriteLine("Error al obtener UserBanks por userID: " + ex.Message);
                return new List<TransactionClass>();
            }
        }

        public void Create(TransactionClass record)
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

        public void Update(TransactionClass record)
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

        public void Delete(TransactionClass record)
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