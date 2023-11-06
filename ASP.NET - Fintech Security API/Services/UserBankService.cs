using System.IO;

namespace ASP.NET___Fintech_API.Services
{
    public class UserBankService
    {
        public String GenerateAlias(string firstName, string lastName, string bankName) => string.Join(".", new[] { firstName, lastName, bankName });

        public string GenerateCVU()
        {
            Random random = new();
            string randomNumbers = "0000";
            for (int i = 0; i < 18; i++) 
                randomNumbers += random.Next(0, 10); 
            return randomNumbers;
        }
    }
}
