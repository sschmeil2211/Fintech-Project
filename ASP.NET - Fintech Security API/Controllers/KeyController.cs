using ASP.NET___Fintech_API.Models;
using ASP.NET___Fintech_API.Repositories;
using ASP.NET___Fintech_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NET___Fintech_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KeyController : ControllerBase
    {
        private readonly KeyRepository _keyRepository;
        private readonly UserRepository _userRepository;
        private readonly KeyService _userService;

        public KeyController(KeyRepository keyRepository, UserRepository userRepository, KeyService userService)
        {
            _keyRepository = keyRepository;
            _userRepository = userRepository;
            _userService = userService;
        }

        //GETs
        [HttpGet("{id}")]
        public IActionResult GetKey(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("ID no válido");
            KeyClass existingKey = _keyRepository.Get(new KeyClass() { id = id });
            if (existingKey == null)
                return BadRequest("Key no encontrado");
            return Ok(existingKey);
        }

        //POSTs
        [HttpPost("{userId}")]
        public IActionResult CreateKey(string userId)
        {
            UserClass existingUser = _userRepository.Get(new UserClass { id = userId }) ?? throw new InvalidOperationException("No se encontró en Firestore.");
            if (existingUser == null)
                return NotFound("Usuario no encontrado");
            string userKey = _userService.Key();
            string userIV = _userService.IV();
            string publicRSA = _userService.GeneratePublicKeyRSA();
            string privateRSA = _userService.EncryptedPrivateKeyRSA(existingUser.id, userKey, userIV);
            KeyClass key = new()
            {
                id = Guid.NewGuid().ToString(),
                userId = existingUser.id,
                publicRSA = publicRSA,
                privateRSA = privateRSA,
                key = userKey,
                iv = userIV
            };
            _keyRepository.Create(key);
            return CreatedAtAction("GetKey", new { key.id }, key);
        }

        //DELETEs
        [HttpDelete("{id}")]
        public IActionResult DeleteBank(string id)
        {
            if(string.IsNullOrEmpty(id))
                return BadRequest("ID no válido");
            KeyClass existingkey = _keyRepository.Get(new KeyClass { id = id }) ?? throw new InvalidOperationException("La Key no se encontró en Firestore.");
            if (existingkey == null)
                return BadRequest("Bank no encontrado");
            _keyRepository.Delete(existingkey);
            return NoContent();
        }
    }
} 
