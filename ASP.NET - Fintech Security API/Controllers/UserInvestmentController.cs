using ASP.NET___Fintech_API.Models;
using ASP.NET___Fintech_API.Repositories;
using ASP.NET___Fintech_API.Services;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NET___Fintech_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserInvestmentController : ControllerBase
    {
        private readonly UserInvestmentRepository _userInvestmentRepository;
        private readonly UserRepository _userRepository;
        private readonly InvestmentRepository _investmentRepository; 

        public UserInvestmentController(UserRepository userRepository, UserInvestmentRepository userInvestmentRepository, InvestmentRepository investmentRepository)
        {
            _userRepository = userRepository;
            _userInvestmentRepository = userInvestmentRepository;
            _investmentRepository = investmentRepository; 
        }

        //GETs
        [HttpGet]
        public IActionResult GetAll()
        {
            List<UserInvestmentClass> userInvestments = _userInvestmentRepository.GetAll();
            return Ok(userInvestments);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserInvestment(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("ID no válido");
            UserInvestmentClass existingUserInvestment = _userInvestmentRepository.Get(new UserInvestmentClass() { id = id });
            if (existingUserInvestment == null)
                return NotFound("UserInvestment no encontrado");
            return Ok(existingUserInvestment);
        }

        [HttpGet("ByUserId/{userId}")]
        public IActionResult GetUserInvestmentsByUserId(string userId)
        {
            List<UserInvestmentClass> userInvestments = _userInvestmentRepository.GetUserInvestmentsByUserId(userId);
            return Ok(userInvestments);
        }

        [HttpGet("ByBankId/{bankId}")]
        public IActionResult GetUserInvestmentsByInvestmentId(string investmentId)
        {
            List<UserInvestmentClass> userInvestments = _userInvestmentRepository.GetUserInvestmentsByInvestmentId(investmentId);
            return Ok(userInvestments);
        }

        //POSTs
        [HttpPost]
        public IActionResult CreateUserInvestment([FromBody] UserInvestmentCreateModel model)
        {
            if (model == null)
                return BadRequest("El objeto UserInvestmentCreateModel es nulo");
            // Validar que el usuario y el banco existan
            UserClass user = _userRepository.Get(new UserClass { id = model.UserID });
            InvestmentClass investment = _investmentRepository.Get(new InvestmentClass { id = model.InvestmentID });

            if (user == null || investment == null)
                return BadRequest("Usuario o banco no encontrados");

            try
            {
                // Generar un nuevo UserBank y asociarlo al usuario y al banco
                UserInvestmentClass userInvestment = new()
                {
                    id = Guid.NewGuid().ToString(),
                    userID = model.UserID,
                    investmentID = model.InvestmentID,
                    createdAt = Timestamp.GetCurrentTimestamp(),
                    amount = model.Amount
                };

                user.userInvestmentIDs ??= new List<string>();
                user.userInvestmentIDs.Add(userInvestment.id);

                investment.userInvestmentIDs ??= new List<string>();
                investment.userInvestmentIDs.Add(userInvestment.id);

                // Guardar el UserBank en la base de datos
                _userInvestmentRepository.Create(userInvestment);
                _userRepository.Update(user);
                _investmentRepository.Update(investment);

                return CreatedAtAction("GetUserInvestment", new { userInvestment.id }, userInvestment);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al crear UserBank: " + ex.Message);
                return StatusCode(500, "Error interno del servidor");
            }
        }

        //PUTs
        [HttpPut("{id}")]
        public IActionResult UpdateUserInvestment(string id, [FromBody] UserInvestmentClass userInvestment)
        {
            if (string.IsNullOrEmpty(id) || userInvestment == null)
                return BadRequest("ID o datos no válidos");
            UserInvestmentClass existingUserInvestment = _userInvestmentRepository.Get(new UserInvestmentClass { id = id }) ?? throw new InvalidOperationException("No se encontró en Firestore.");
            if (existingUserInvestment == null)
                return NotFound("UserInvestment no encontrado");
            _userInvestmentRepository.Update(existingUserInvestment);
            return NoContent();
        }

        //DELETEs
        [HttpDelete("{id}")]
        public IActionResult DeleteUserInvestment(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("ID no válido");
            UserInvestmentClass existingUserInvestment = _userInvestmentRepository.Get(new UserInvestmentClass { id = id }) ?? throw new InvalidOperationException("No se encontró en Firestore.");
            if (existingUserInvestment == null)
                return NotFound("UserInvestment no encontrado");
            _userInvestmentRepository.Delete(existingUserInvestment);
            return NoContent();
        }
    }
}
