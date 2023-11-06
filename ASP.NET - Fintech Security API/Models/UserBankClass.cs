using Google.Cloud.Firestore;
using System.ComponentModel.DataAnnotations;

namespace ASP.NET___Fintech_API.Models
{
    [FirestoreData]
    public class UserBankClass : FirebaseDocumentClass
    {
        [FirestoreProperty] public string? userID { get; set; }
        [FirestoreProperty] public string? bankID { get; set; }
        [FirestoreProperty] public string? cvu { get; set; }
        [FirestoreProperty] public string? alias { get; set; }
    }

    public class UserBankCreateModel
    {
        [Required] public required string UserID { get; set; }

        [Required] public required string BankID { get; set; }
    }
}
