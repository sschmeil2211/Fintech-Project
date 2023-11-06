using ASP.NET___Fintech_API.Models;

namespace ASP.NET___Fintech_API.Repositories
{
    public class InvestmentRepository : IFirestoreRepository<InvestmentClass>
    {
        private readonly string _collectionName = "investments";
        private readonly FirestoreRepository _firestoreRepository; 

        public InvestmentRepository() => _firestoreRepository = new FirestoreRepository(_collectionName);

        public List<InvestmentClass> GetAll()
        {
            try
            {  
                List<InvestmentClass> investments = _firestoreRepository.GetAll<InvestmentClass>();
                return investments;  
            }
            catch (Exception ex)
            {
                // Puedes personalizar el manejo de excepciones aquí
                Console.WriteLine("Error en GetAll: " + ex.Message);
                throw; // Puedes relanzar la excepción o manejarla de otra forma si es necesario
            }
        } 

        public InvestmentClass Get(InvestmentClass record)
        {
            try
            {
                InvestmentClass investment = _firestoreRepository.Get(record) 
                    ?? throw new InvalidOperationException("El objeto InvestmentClass no se encontró en Firestore.");
                return investment;
            }
            catch (Exception ex)
            {
                // Puedes personalizar el manejo de excepciones aquí
                Console.WriteLine("Error en Get: " + ex.Message);
                throw; // Puedes relanzar la excepción o manejarla de otra forma si es necesario
            }
        }

        public void Create(InvestmentClass record)
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

        public void Update(InvestmentClass record)
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

        public void Delete(InvestmentClass record)
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