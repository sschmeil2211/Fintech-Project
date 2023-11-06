using ASP.NET___Fintech_API.Models;
using Google.Cloud.Firestore;

namespace ASP.NET___Fintech_API.Repositories
{
    public class FirestoreRepository
    {
        private readonly string _collectionName;
        private readonly FirestoreDb firestoreDB;

        public FirestoreRepository(string collectionName)
        { 
            string path = "C:/Users/sebas/brubankfirebase-06dd245cfb72.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", path);
            firestoreDB = FirestoreDb.Create("brubankfirebase");
            _collectionName = collectionName; 
        }

        public T? Get<T>(T record) where T : FirebaseDocumentClass
        {
            try 
            {
                DocumentReference docRef = firestoreDB.Collection(_collectionName).Document(record.id);
                DocumentSnapshot docSnapshot = docRef.GetSnapshotAsync().GetAwaiter().GetResult();
                if (!docSnapshot.Exists) return null;
                T doc = docSnapshot.ConvertTo<T>();
                doc.id = docSnapshot.Id;
                return doc;
            }
            catch (Exception ex) 
            {
                Console.WriteLine("Error en Get: " + ex.Message);
                return null;
            } 
        }

        public List<T> GetAll<T>() where T : FirebaseDocumentClass
        {
            try
            {
                CollectionReference collectionRef = firestoreDB.Collection(_collectionName);
                QuerySnapshot querySnapshot = collectionRef.GetSnapshotAsync().GetAwaiter().GetResult();
                return querySnapshot.Documents
                    .Select(doc => doc.ConvertTo<T>())
                    .ToList();
            }
            catch (Exception ex)
            {
                // Maneja las excepciones según tus necesidades (registra, lanza, etc.)
                Console.WriteLine("Error en GetAll: " + ex.Message);
                return new List<T>();
            } 
        }

        public void Create<T>(T record) where T : FirebaseDocumentClass
        {
            try
            {
                // Genera un nuevo ID si el registro no tiene uno
                if (string.IsNullOrEmpty(record.id))
                    record.id = Guid.NewGuid().ToString(); // Puedes usar otra estrategia para generar IDs únicos

                DocumentReference docRef = firestoreDB.Collection(_collectionName).Document(record.id);
                docRef.CreateAsync(record).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error en Create: " + ex.Message);
                throw;
            }
        }

        public void Update<T>(T record) where T : FirebaseDocumentClass
        {
            try
            {
                if (string.IsNullOrEmpty(record.id))
                    throw new ArgumentException("El objeto no tiene un ID válido.");
                DocumentReference docRef = firestoreDB.Collection(_collectionName).Document(record.id);
                docRef.SetAsync(record).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error en Update: " + ex.Message);
                throw;
            }
        }

        public void Delete<T>(T record) where T : FirebaseDocumentClass
        {
            try
            {
                if (string.IsNullOrEmpty(record.id))
                    throw new ArgumentException("El objeto no tiene un ID válido.");
                DocumentReference docRef = firestoreDB.Collection(_collectionName).Document(record.id);
                docRef.DeleteAsync().GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error en Delete: " + ex.Message);
                throw;
            }
        }
    }
}