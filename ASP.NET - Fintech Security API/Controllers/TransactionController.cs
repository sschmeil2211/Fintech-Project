using ASP.NET___Fintech_API.Models;
using ASP.NET___Fintech_API.Repositories;
using ASP.NET___Fintech_API.Services;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using System.Data.Common;
using System.Security.Cryptography;
using System.Text;
using System.Transactions;

namespace ASP.NET___Fintech_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly TransactionRepository _transactionRepository;
        private readonly UserRepository _userRepository;
        private readonly KeyRepository _keyRepository;
        private readonly KeyService _keyService;

        public TransactionController(UserRepository userRepository, TransactionRepository transactionRepository, KeyService keyService, KeyRepository keyRepository)
        {
            _userRepository = userRepository;
            _transactionRepository = transactionRepository;
            _keyService = keyService;
            _keyRepository = keyRepository;
        }

        //GETs
        [HttpGet]
        public IActionResult GetAll()
        {
            List<TransactionClass> transactions = _transactionRepository.GetAll();
            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public IActionResult GetTransaction(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("ID no válido");
            TransactionClass existingTransaction = _transactionRepository.Get(new TransactionClass() { id = id });
            if(existingTransaction == null)
                return NotFound("Transaction no encontrado");
            return Ok(existingTransaction);
        }

        [HttpGet("BySenderId/{userId}")]
        public IActionResult GetTransactionBySenderId(string userId)
        {
            List<TransactionClass> transactions = _transactionRepository.GetTransactionBySenderId(userId);
            return Ok(transactions);
        }

        [HttpGet("ByReceiverId/{userId}")]
        public IActionResult GetTransactionByReceiverId(string userId)
        {
            List<TransactionClass> transactions = _transactionRepository.GetTransactionByReceiverId(userId);
            return Ok(transactions);
        }

        //POSTs
        [HttpPost] 
        public IActionResult CreateTransaction([FromBody] TransactionCreateModel model)
        {
            if (model == null)
                return BadRequest("El objeto TransactionCreateModel es nulo");

            try
            {
                // Obtener el remitente desde la base de datos
                UserClass sender = _userRepository.Get(new UserClass { id = model.SenderUser! });
                if(sender == null)
                    return NotFound("Usuario remitente no encontrado");
                KeyClass? senderKeys = _keyRepository.GetKeyByUserId( sender.id );
                if (senderKeys == null || string.IsNullOrEmpty(senderKeys.privateRSA) || string.IsNullOrEmpty(senderKeys.key) || string.IsNullOrEmpty(senderKeys.iv) || string.IsNullOrEmpty(senderKeys.userId))
                    return NotFound("Usuario remitente no encontrado");

                string privateKey = _keyService.DecryptPrivateKeyRSA(senderKeys.privateRSA, senderKeys.key, senderKeys.iv);
                // Utilizar la clave privada del remitente para cifrar la firma
                _keyService.FromXmlString(privateKey);
                string transactionData = $"{model.SenderUser}:{model.ReceiverUser}";//:{model.Amount}:{model.Message}";
                byte[] dataToSign = Encoding.UTF8.GetBytes(transactionData);
                byte[] signatureBytes;
                using (SHA256 sha256 = SHA256.Create())
                {
                    signatureBytes = _keyService.SignData(dataToSign, sha256);
                }

                TransactionClass transaction = new()
                {
                    id = Guid.NewGuid().ToString(),
                    senderUser = model.SenderUser,
                    receiverUser = model.ReceiverUser,
                    amount = model.Amount,
                    message = model.Message,
                    reasonType = model.ReasonType,
                    createdAt = Timestamp.GetCurrentTimestamp(),
                    signature = Convert.ToBase64String(signatureBytes), // Almacena la firma cifrada
                    isValid = false
                };

                _transactionRepository.Create(transaction);

                return CreatedAtAction("GetTransaction", new { id = transaction.id }, transaction);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al crear la transacción: " + ex.Message);
                return StatusCode(500, "Error interno del servidor");
            }
        }

        [HttpPost("{id}/ValidateTransaction")]
        public IActionResult ValidateTransaction(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("ID no válido");

            TransactionClass existingTransaction = _transactionRepository.Get(new TransactionClass { id = id }) ?? throw new InvalidOperationException("No se encontró en Firestore.");
            if (existingTransaction == null)
                return NotFound("Transaction no encontrado");

            try
            {
                if(string.IsNullOrEmpty(existingTransaction.signature) || string.IsNullOrEmpty(existingTransaction.senderUser) || string.IsNullOrEmpty(existingTransaction.receiverUser))
                    return BadRequest("Valores inexistentes");
                byte[] signatureBytes = Convert.FromBase64String(existingTransaction.signature);

                UserClass sender = _userRepository.Get(new UserClass { id = existingTransaction.senderUser });
                UserClass receiver = _userRepository.Get(new UserClass { id = existingTransaction.receiverUser });
                if (sender == null || receiver == null)
                    return NotFound("Usuario remitente no encontrado");
                KeyClass? senderKeys = _keyRepository.GetKeyByUserId(sender.id);
                if (senderKeys == null || string.IsNullOrEmpty(senderKeys.publicRSA))
                    return NotFound("Usuario remitente no encontrado");

                _keyService.FromXmlString(senderKeys.publicRSA);

                string transactionData = $"{existingTransaction.senderUser}:{existingTransaction.receiverUser}";//:{existingTransaction.amount}:{existingTransaction.message}";
                byte[] dataToVerify = Encoding.UTF8.GetBytes(transactionData);

                using SHA256 sha256 = SHA256.Create();
                // Verificar la firma

                bool isSignatureValid = _keyService.VerifyData(dataToVerify, sha256, signatureBytes);
                sender.transactionsIDs?.Add(existingTransaction.id);
                receiver.transactionsIDs?.Add(existingTransaction.id);

                sender.balance -= existingTransaction.amount;
                receiver.balance += existingTransaction.amount;

                if (!sender.contactIDs!.Contains(existingTransaction.receiverUser))
                    sender.contactIDs?.Add(existingTransaction.receiverUser);
                if (!receiver.contactIDs!.Contains(existingTransaction.senderUser))
                    receiver.contactIDs.Add(existingTransaction.senderUser);
                if (isSignatureValid)
                {
                    _userRepository.Update(sender);
                    _userRepository.Update(receiver);
                }


                // Actualizar el estado de validación de la transacción
                existingTransaction.isValid = isSignatureValid;

                _transactionRepository.Update(existingTransaction); 

                return Ok(new { isValid = isSignatureValid });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al validar la transacción: " + ex.Message);
                return StatusCode(500, "Error interno del servidor");
            }
        }

        //PUTs
        [HttpPut("{id}")]
        public IActionResult UpdateTransactions(string id, [FromBody] TransactionClass transaction)
        {
            if (string.IsNullOrEmpty(id) || transaction == null)
                return BadRequest("ID o datos no válidos");
            TransactionClass existingTransaction = _transactionRepository.Get(new TransactionClass { id = id }) ?? throw new InvalidOperationException("No se encontró en Firestore.");
            if (existingTransaction == null)
                return NotFound("Transaction no encontrado");
            _transactionRepository.Update(existingTransaction);
            return NoContent();
        }

        //DELETEs
        [HttpDelete("{id}")]
        public IActionResult DeleteTransaction(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("ID no válido");
            TransactionClass existingTransaction = _transactionRepository.Get(new TransactionClass { id = id }) ?? throw new InvalidOperationException("No se encontró en Firestore.");
            if (existingTransaction == null)
                return NotFound("UserBank no encontrado");
            _transactionRepository.Delete(existingTransaction);
            return NoContent();
        }
    }
}


/*[HttpPost]
public IActionResult CreateTransaction([FromBody] TransactionCreateModel model)
{
    if (model == null)
        return BadRequest("El objeto TransactionCreateModel es nulo");

    try
    {
        // Obtener la clave privada del remitente desde la base de datos
        UserClass sender = _userRepository.Get(new UserClass { id = model.SenderUser! });
        if (sender == null)
            return NotFound("Usuario remitente no encontrado");

        byte[] encryptedPrivateKeyBytes = Convert.FromBase64String(sender.privateKey!);
        byte[] salt = Convert.FromBase64String(sender.securityValue!);
        byte[] userMasterKey = _userService.DeriveUserMasterKey(sender.securityValue!, salt);

        // Recuperar el IV de la clave privada cifrada
        byte[] iv = new byte[16];
        Array.Copy(encryptedPrivateKeyBytes, 0, iv, 0, 16);

        // Desencriptar la clave privada
        byte[] decryptedPrivateKey = _userService.DecryptPrivateKey(sender.privateKey!, userMasterKey);

        TransactionClass transaction = new()
        {
            id = Guid.NewGuid().ToString(),
            senderUser = model.SenderUser,
            receiverUser = model.ReceiverUser,
            amount = model.Amount,
            message = model.Message,
            reasonType = model.ReasonType,
            createdAt = Timestamp.GetCurrentTimestamp(),
            signature = "",
            isValid = false
        };

        // Crear una instancia RSA con la clave privada del remitente
        using (RSA rsa = RSA.Create())
        {
            rsa.ImportRSAPrivateKey(decryptedPrivateKey, out _);
            // Convertir los datos de la transacción en un formato adecuado para firmar
            string transactionData = $"{model.SenderUser}:{model.ReceiverUser}:{model.Amount}:{model.Message}";
            byte[] dataToSign = Encoding.UTF8.GetBytes(transactionData);
            // Firmar los datos de la transacción
            byte[] signature = rsa.SignData(dataToSign, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
            // Convertir la firma a una cadena Base64 para almacenarla en la transacción
            transaction.signature = Convert.ToBase64String(signature);
        }
        // Guardar la transacción en la base de datos
        _transactionRepository.Create(transaction);
        return CreatedAtAction("GetTransaction", new { id = transaction.id }, transaction);
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error al crear la transacción: " + ex.Message);
        return StatusCode(500, "Error interno del servidor");
    }
}

[HttpPost("ValidateTransaction")]
public IActionResult ValidateTransaction([FromBody] TransactionClass transaction)
{
    if (transaction == null)
        return BadRequest("El objeto TransactionClass es nulo");
    try
    {
        // Obtener la clave pública del remitente desde la base de datos
        UserClass sender = _userRepository.Get(new UserClass { id = transaction.senderUser });
        if (sender == null)
            return NotFound("Usuario remitente no encontrado");

        // Crear una instancia RSA con la clave pública del remitente
        using (RSA rsa = RSA.Create())
        {
            rsa.ImportRSAPublicKey(Convert.FromBase64String(sender.publicKey), out _);

            // Convertir los datos de la transacción en un formato adecuado para verificar
            string transactionData = $"{transaction.senderUser}:{transaction.receiverUser}:{transaction.amount}:{transaction.message}";
            byte[] dataToVerify = Encoding.UTF8.GetBytes(transactionData);

            // Verificar la firma digital
            bool isValid = rsa.VerifyData(dataToVerify, Convert.FromBase64String(transaction.signature), HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);

            // Establecer el estado de validación en la transacción
            transaction.isValid = isValid;
        }

        // Actualizar la transacción en la base de datos con el resultado de la validación
        _transactionRepository.Update(transaction);

        return Ok(new { isValid = transaction.isValid });
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error al validar la transacción: " + ex.Message);
        return StatusCode(500, "Error interno del servidor");
    }
}*/