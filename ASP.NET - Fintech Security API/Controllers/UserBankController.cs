using ASP.NET___Fintech_API.Models;
using ASP.NET___Fintech_API.Repositories;
using ASP.NET___Fintech_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NET___Fintech_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserBankController : ControllerBase
    {
        private readonly UserBankRepository _userBankRepository;
        private readonly UserRepository _userRepository;
        private readonly BankRepository _bankRepository;
        private readonly UserBankService _userBankService;

        public UserBankController(UserRepository userRepository, UserBankRepository userBankRepository, BankRepository bankRepository, UserBankService userBankService)
        {
            _userRepository = userRepository;
            _userBankRepository = userBankRepository;
            _bankRepository = bankRepository;
            _userBankService = userBankService;
        }

        //GETs
        [HttpGet]
        public IActionResult GetAll()
        {
            List<UserBankClass> userBanks = _userBankRepository.GetAll();
            return Ok(userBanks);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserBank(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("ID no válido");
            UserBankClass existingUserBank = _userBankRepository.Get(new UserBankClass() { id = id });
            if(existingUserBank == null)
                return NotFound("UserBank no encontrado");
            return Ok(existingUserBank);
        }

        [HttpGet("ByUserId/{userId}")]
        public IActionResult GetUserBanksByUserId(string userId)
        {
            List<UserBankClass> userBanks = _userBankRepository.GetUserBanksByUserId(userId);
            return Ok(userBanks);
        }

        [HttpGet("ByBankId/{bankId}")]
        public IActionResult GetUserBanksByBankId(string bankId)
        {
            List<UserBankClass> userBanks = _userBankRepository.GetUserBanksByUserId(bankId);
            return Ok(userBanks);
        }

        //POSTs
        [HttpPost]
        public IActionResult CreateUserBank([FromBody] UserBankCreateModel model)
        {
            if (model == null)
                return BadRequest("El objeto UserBankCreateModel es nulo");
            // Validar que el usuario y el banco existan
            UserClass user = _userRepository.Get(new UserClass { id = model.UserID });
            BankClass bank = _bankRepository.Get(new BankClass { id = model.BankID });

            if (user == null || bank == null)
                return BadRequest("Usuario o banco no encontrados");

            try
            {
                // Generar un nuevo UserBank y asociarlo al usuario y al banco
                UserBankClass userBank = new()
                {
                    id = Guid.NewGuid().ToString(),
                    userID = model.UserID,
                    bankID = model.BankID,
                    alias = _userBankService.GenerateAlias(user.firstName!, user.lastName!, bank.name!),
                    cvu = _userBankService.GenerateCVU()
                };

                user.userBankIDs ??= new List<string>();
                user.userBankIDs.Add(userBank.id);

                bank.userBankIDs ??= new List<string>();
                bank.userBankIDs.Add(userBank.id);

                // Guardar el UserBank en la base de datos
                _userBankRepository.Create(userBank);
                _userRepository.Update(user);
                _bankRepository.Update(bank);

                return CreatedAtAction("GetUserBank", new { userBank.id }, userBank);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al crear UserBank: " + ex.Message);
                return StatusCode(500, "Error interno del servidor");
            }
        }

        //PUTs
        [HttpPut("{id}")]
        public IActionResult UpdateUserBank(string id, [FromBody] UserBankClass userBank)
        {
            if (string.IsNullOrEmpty(id) || userBank == null)
                return BadRequest("ID o datos no válidos");
            UserBankClass existingUserBank = _userBankRepository.Get(new UserBankClass { id = id }) ?? throw new InvalidOperationException("No se encontró en Firestore.");
            if (existingUserBank == null)
                return NotFound("UserBank no encontrado");
            _userBankRepository.Update(existingUserBank);
            return NoContent();
        }

        //DELETEs
        [HttpDelete("{id}")]
        public IActionResult DeleteUserBank(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("ID no válido");
            UserBankClass existingUserBank = _userBankRepository.Get(new UserBankClass { id = id }) ?? throw new InvalidOperationException("No se encontró en Firestore.");
            if (existingUserBank == null)
                return NotFound("UserBank no encontrado");
            _userBankRepository.Delete(existingUserBank);
            return NoContent();
        }
    }
}
