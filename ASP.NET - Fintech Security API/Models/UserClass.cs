using Google.Cloud.Firestore;
using System.ComponentModel.DataAnnotations;

namespace ASP.NET___Fintech_API.Models
{
    [FirestoreData]
    public class UserClass: FirebaseDocumentClass
    {
        [FirestoreProperty] public string? email { get; set; }
        [FirestoreProperty] public string? phone { get; set; } // Cambiado de phoneNumber
        [FirestoreProperty] public string? pinCode { get; set; }
        [FirestoreProperty] public string? firstName { get; set; }
        [FirestoreProperty] public string? lastName { get; set; }
        [FirestoreProperty] public string? dni { get; set; }
        [FirestoreProperty] public string? cuilCuit { get; set; }
        [FirestoreProperty] public GenreType? genreType { get; set; }
        [FirestoreProperty] public string? address { get; set; }
        [FirestoreProperty] public string? addressNumber { get; set; } // Cambiado de string a int
        [FirestoreProperty] public string? apartmentNumber { get; set; } // Cambiado de string a int
        [FirestoreProperty] public string? floorNumber { get; set; } // Cambiado de string a int
        [FirestoreProperty] public string? postalCode { get; set; }
        [FirestoreProperty] public CivilStatusType? civilStatusType { get; set; }
        [FirestoreProperty] public NationalityType? nationalityType { get; set; }
        [FirestoreProperty] public OccupationType? occupationType { get; set; }
        [FirestoreProperty] public string? profileColor { get; set; }
        [FirestoreProperty] public Timestamp? updateAt { get; set; } // Cambiado a Timestamp
        [FirestoreProperty] public Timestamp? createdAt { get; set; } // Cambiado a Timestamp
        [FirestoreProperty] public double? balance { get; set; }
        [FirestoreProperty] public List<string>? contactIDs { get; set; }
        [FirestoreProperty] public List<string>? userBankIDs { get; set; } // Cambiado a List<Reference>
        [FirestoreProperty] public List<string>? userInvestmentIDs { get; set; } // Cambiado a List<Reference>
        [FirestoreProperty] public List<string>? transactionsIDs { get; set; } // Cambiado a List<Reference>
    }

    public class UserCreateModel
    {
        [Required] public string? Email { get; set; }
        [Required] public string? Phone { get; set; } // Cambiado de phoneNumber
        [Required] public string? PinCode { get; set; }
        [Required] public string? FirstName { get; set; }
        [Required] public string? LastName { get; set; }
        [Required] public string? DNI { get; set; }
        [Required] public string? CuilCuit { get; set; }
        [Required] public GenreType? GenreType { get; set; }
        [Required] public string? Address { get; set; }
        [Required] public string? AddressNumber { get; set; } // Cambiado de string a int
        public string? ApartmentNumber { get; set; } // Cambiado de string a int
        public string? FloorNumber { get; set; } // Cambiado de string a int
        [Required] public string? PostalCode { get; set; }
        [Required] public CivilStatusType? CivilStatusType { get; set; }
        [Required] public NationalityType? NationalityType { get; set; }
        [Required] public OccupationType? OccupationType { get; set; }
        [Required] public string? ProfileColor { get; set; }
    }

    public enum GenreType
    {
        MALE,
        FEMALE
    }

    public enum CivilStatusType
    {
        MARRIED,
        SINGLE
    }

    public enum NationalityType
    {
        ARGENTINIAN,
        BRAZILIAN
    }

    public enum OccupationType
    {
        AUTONOMOUS,
        UNEMPLOYED
    } 
}
