using Google.Cloud.Firestore;
using System.ComponentModel.DataAnnotations;

namespace ASP.NET___Fintech_API.Models
{
    [FirestoreData]
    public class KeyClass : FirebaseDocumentClass
    {
        [FirestoreProperty] public string? userId { get; set; }
        [FirestoreProperty] public string? publicRSA { get; set; }
        [FirestoreProperty] public string? privateRSA { get; set; }
        [FirestoreProperty] public string? key { get; set; }
        [FirestoreProperty] public string? iv { get; set; }
    }
}
