using Google.Cloud.Firestore;
using System.ComponentModel.DataAnnotations;

namespace ASP.NET___Fintech_API.Models
{
    [FirestoreData]
    public class UserInvestmentClass : FirebaseDocumentClass
    {
        [FirestoreProperty] public string? userID { get; set; }
        [FirestoreProperty] public string? investmentID { get; set; }
        [FirestoreProperty] public double? amount { get; set; }
        [FirestoreProperty] public Timestamp? createdAt { get; set; }
    }

    public class UserInvestmentCreateModel
    {
        [Required] public required string UserID { get; set; }
        [Required] public required string InvestmentID { get; set; }
        [Required] public required double Amount { get; set; }
    }
}
