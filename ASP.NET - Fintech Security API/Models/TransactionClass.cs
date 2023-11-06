using Google.Cloud.Firestore;
using System.ComponentModel.DataAnnotations;

namespace ASP.NET___Fintech_API.Models
{
    [FirestoreData]
    public class TransactionClass : FirebaseDocumentClass
    {
        [FirestoreProperty] public string? senderUser { get; set; }
        [FirestoreProperty] public string? receiverUser { get; set; }
        [FirestoreProperty] public double? amount { get; set; }
        [FirestoreProperty] public string? message { get; set; }
        [FirestoreProperty] public ReasonType? reasonType { get; set; }
        [FirestoreProperty] public Timestamp? createdAt { get; set; }
        [FirestoreProperty] public string? signature { get; set; }
        [FirestoreProperty] public bool? isValid { get; set; }
    }

    public class TransactionCreateModel
    {
        [Required] public string? SenderUser { get; set; }

        [Required] public string? ReceiverUser { get; set; }
        [Required] public double? Amount { get; set; }
        [Required] public string? Message { get; set; }
        [Required] public ReasonType? ReasonType { get; set; }
    }

    public enum ReasonType
    {
        REASON1,
        REASON2,
    }
}
