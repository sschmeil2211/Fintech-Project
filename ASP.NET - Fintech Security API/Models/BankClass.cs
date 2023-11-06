using Google.Cloud.Firestore;

namespace ASP.NET___Fintech_API.Models
{
    [FirestoreData]
    public class BankClass : FirebaseDocumentClass
    {
        [FirestoreProperty] public string? name { get; set; }
        [FirestoreProperty] public List<string>? userBankIDs { get; set; }
    }
}
