using ASP.NET___Fintech_API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NET___Fintech_API.Repositories
{
    public class UserInvestmentRepository : IFirestoreRepository<UserInvestmentClass>
    {
        private readonly string _collectionName = "userInvestments";
        private readonly FirestoreRepository _firestoreRepository;

        public UserInvestmentRepository() => _firestoreRepository = new FirestoreRepository(_collectionName);

        public List<UserInvestmentClass> GetAll()
        {
            try
            {
                List<UserInvestmentClass> userInvestments = _firestoreRepository.GetAll<UserInvestmentClass>();
                return userInvestments;
            }
            catch (Exception ex)
            {
                // Puedes personalizar el manejo de excepciones aquí
                Console.WriteLine("Error en GetAll: " + ex.Message);
                throw; // Puedes relanzar la excepción o manejarla de otra forma si es necesario
            }
        }

        public UserInvestmentClass Get(UserInvestmentClass record)
        {
            try
            {
                UserInvestmentClass userInvestment = _firestoreRepository.Get(record) ?? throw new InvalidOperationException("El objeto UserInvestmentClass no se encontró en Firestore.");
                return userInvestment;
            }
            catch (Exception ex)
            {
                // Puedes personalizar el manejo de excepciones aquí
                Console.WriteLine("Error en Get: " + ex.Message);
                throw; // Puedes relanzar la excepción o manejarla de otra forma si es necesario
            }
        }

        public List<UserInvestmentClass> GetUserInvestmentsByUserId(string userId)
        {
            try
            {
                // Filtra los UserBanks por userID
                List<UserInvestmentClass> userInvestments = _firestoreRepository
                    .GetAll<UserInvestmentClass>()
                    .Where(userInvestment => userInvestment.userID == userId)
                    .ToList();
                return userInvestments;
            }
            catch (Exception ex)
            {
                // Maneja las excepciones según tus necesidades (registra, lanza, etc.)
                Console.WriteLine("Error al obtener UserInvestment por userID: " + ex.Message);
                return new List<UserInvestmentClass>();
            }
        }

        public List<UserInvestmentClass> GetUserInvestmentsByInvestmentId(string investmentId)
        {
            try
            {
                // Filtra los UserBanks por bankID
                List<UserInvestmentClass> userInvestment = _firestoreRepository
                    .GetAll<UserInvestmentClass>()
                    .Where(userInvestment => userInvestment.investmentID == investmentId)
                    .ToList();
                return userInvestment;
            }
            catch (Exception ex)
            {
                // Maneja las excepciones según tus necesidades (registra, lanza, etc.)
                Console.WriteLine("Error al obtener UserInvestmentClass por investmentID: " + ex.Message);
                return new List<UserInvestmentClass>();
            }
        }

        public void Create(UserInvestmentClass record)
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

        public void Update(UserInvestmentClass record)
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

        public void Delete(UserInvestmentClass record)
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