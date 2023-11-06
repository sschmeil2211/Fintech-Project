using ASP.NET___Fintech_API.Models;
using ASP.NET___Fintech_API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NET___Fintech_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankController : ControllerBase
    {
        private readonly BankRepository _bankRepository;

        public BankController(BankRepository bankRepository) => _bankRepository = bankRepository;
        //GETs
        [HttpGet]
        public IActionResult GetAll()
        {
            List<BankClass> banks = _bankRepository.GetAll();
            return Ok(banks);
        }

        [HttpGet("{id}")]
        public IActionResult GetBank(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("ID no válido");
            BankClass existingBank = _bankRepository.Get(new BankClass() { id = id });
            if (existingBank == null)
                return BadRequest("Bank no encontrado");
            return Ok(existingBank);
        }

        //POSTs
        [HttpPost]
        public IActionResult CreateBank([FromBody] BankClass bank)
        {
            if (bank == null) 
                return BadRequest("El objeto BankClass es nulo");
            _bankRepository.Create(bank);
            return CreatedAtAction("GetBank", new { bank.id }, bank);
        }

        //PUTs
        [HttpPut("{id}")]
        public IActionResult UpdateBank(string id, [FromBody] BankClass bank)
        {
            if (string.IsNullOrEmpty(id) || bank == null)
                return BadRequest("ID o datos no válidos");
            BankClass existingBank = _bankRepository.Get(new BankClass { id = id }) ?? throw new InvalidOperationException("El banco no se encontró en Firestore.");
            _bankRepository.Update(existingBank);
            if (existingBank == null)
                return BadRequest("Bank no encontrado");
            return NoContent();
        }

        //DELETEs
        [HttpDelete("{id}")]
        public IActionResult DeleteBank(string id)
        {
            if(string.IsNullOrEmpty(id))
                return BadRequest("ID no válido");
            BankClass existingBank = _bankRepository.Get(new BankClass { id = id }) ?? throw new InvalidOperationException("El banco no se encontró en Firestore.");
            if (existingBank == null)
                return BadRequest("Bank no encontrado");
            _bankRepository.Delete(existingBank);
            return NoContent();
        }
    }
} 
