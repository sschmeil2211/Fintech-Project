using Google.Cloud.Firestore; 

namespace ASP.NET___Fintech_API.Models
{
    [FirestoreData]
    public class InvestmentClass : FirebaseDocumentClass //InvestmentCOllection
    {  
        [FirestoreProperty] public InvestmentType? investmentType { get; set; }
        [FirestoreProperty] public string? name { get; set; }
        [FirestoreProperty] public string? description { get; set; }
        [FirestoreProperty] public float expectedEfficiency { get; set; }
        [FirestoreProperty] public float fluctuations { get; set; } 
        [FirestoreProperty] public float errorRange { get; set; }
        [FirestoreProperty] public float randomizer { get; set; } 
        [FirestoreProperty] public int initialBalance { get; set; }
        [FirestoreProperty] public List<String>? userInvestmentIDs { get; set; }
        [FirestoreProperty] public List<String>? investmentProfits { get; set; }
    }

    public enum InvestmentType
    {
        CRYPTO,
        FOREIGN_EXCHANGE,
        SHARES_OF_STOCK,
        ESTATE
    }
}