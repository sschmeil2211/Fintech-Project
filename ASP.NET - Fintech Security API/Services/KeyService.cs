using System.Buffers.Text;
using System.Security.Cryptography;
using System.Text;

namespace ASP.NET___Fintech_API.Services
{
    public class KeyService
    {
        private readonly RSACryptoServiceProvider rsa = new();

        public static byte[] GenerateRandomBytes(int length)
        {
            using RandomNumberGenerator rng = RandomNumberGenerator.Create();
            byte[] randomBytes = new byte[length];
            rng.GetBytes(randomBytes);
            return randomBytes;
        }

        // Método para generar una clave pública RSA
        public string GeneratePublicKeyRSA() => rsa.ToXmlString(false); 

        // Método para generar una clave privada RSA
        private string GeneratePrivateKeyRSA() => rsa.ToXmlString(true);

        public string Key()
        {
            byte[] keyBytes = GenerateRandomBytes(32);
            return Convert.ToBase64String(keyBytes);
        }

        public string IV()
        {
            byte[] keyBytes = GenerateRandomBytes(16);
            return Convert.ToBase64String(keyBytes);
        }

        public string EncryptedPrivateKeyRSA(string userId, string userKey, string userIV)
        {
            string privateKey = GeneratePrivateKeyRSA();
            string valueToEncrypt = privateKey + userId;
            return Encrypt(valueToEncrypt, userKey, userIV);
        }

        public string DecryptPrivateKeyRSA(string encryptedValue, string userKey, string userIV)
        {
            string decryptedValue = Decrypt(encryptedValue, userKey, userIV);
            // Supongo que el userID se encuentra al final del valor desencriptado
            int userIdLength = 36;
            if (decryptedValue.Length < userIdLength)
                throw new ArgumentException("Valor desencriptado no válido.");// El valor desencriptado no tiene la longitud esperada, así que no se puede separar
            // Obtener el privateKey y el userId
            string privateKey = decryptedValue.Substring(0, decryptedValue.Length - userIdLength);
            //string userId = decryptedValue.Substring(decryptedValue.Length - userIdLength);
            // Ahora tienes el privateKey y el userId desencriptados, puedes hacer lo que necesites con ellos.
            return privateKey;
        }

        public static string Encrypt(string plainText, string key, string iv)
        {
            using Aes aesAlg = Aes.Create();
            aesAlg.Key = Convert.FromBase64String(key);
            aesAlg.IV = Convert.FromBase64String(iv);
            ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);
            using MemoryStream msEncrypt = new();
            using (CryptoStream csEncrypt = new(msEncrypt, encryptor, CryptoStreamMode.Write))
            using (StreamWriter swEncrypt = new(csEncrypt))
                swEncrypt.Write(plainText);
            return Convert.ToBase64String(msEncrypt.ToArray());
        }

        public static string Decrypt(string cipherText, string key, string iv)
        {
            using Aes aesAlg = Aes.Create();
            aesAlg.Key = Convert.FromBase64String(key);
            aesAlg.IV = Convert.FromBase64String(iv);
            ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);
            using MemoryStream msDecrypt = new(Convert.FromBase64String(cipherText));
            using CryptoStream csDecrypt = new(msDecrypt, decryptor, CryptoStreamMode.Read);
            using StreamReader srDecrypt = new(csDecrypt);
            return srDecrypt.ReadToEnd();
        }

        public void FromXmlString(string key) => rsa.FromXmlString(key);

        public byte[] SignData(byte[] buffer, object halg) => rsa.SignData(buffer, halg);

        public bool VerifyData(byte[] buffer, object halg, byte[] signature) => rsa.VerifyData(buffer, halg, signature);
    }
}