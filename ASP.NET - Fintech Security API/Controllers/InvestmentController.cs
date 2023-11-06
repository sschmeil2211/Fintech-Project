using ASP.NET___Fintech_API.Repositories;
using ASP.NET___Fintech_API.Models; 
using Microsoft.AspNetCore.Mvc;
using ASP.NET___Fintech_API.Services;

namespace ASP.NET___Fintech_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvestmentController : ControllerBase
    {
        private readonly InvestmentRepository _investmentRepository;
        private readonly InvestmentService _investmentService;

        public InvestmentController(InvestmentRepository investmentRepository, InvestmentService investmentService)
        {
            _investmentRepository = investmentRepository;
            _investmentService = investmentService;
        }

        //GETs
        [HttpGet]
        public IActionResult GetAll()
        {
            List<InvestmentClass> investments = _investmentRepository.GetAll();
            return Ok(investments);
        }

        [HttpGet("{id}")]
        public IActionResult GetInvestment(string id)
        {
            if(string.IsNullOrEmpty(id))
                return BadRequest("ID no válido");
            InvestmentClass existingInvestment = _investmentRepository.Get(new InvestmentClass() { id = id });
            if (existingInvestment == null)
                return NotFound("Investment no encontrado");
            return Ok(existingInvestment); 
        }

        //POSTs
        [HttpPost]
        public IActionResult CreateInvestment([FromBody] InvestmentClass investment)
        {
            if (investment == null) 
                return BadRequest("El objeto InvestmentClass es nulo");
            _investmentRepository.Create(investment); 
            return CreatedAtAction("GetInvestment", new { investment.id }, investment);
        }

        //PUTs
        [HttpPut("{id}")]
        public IActionResult UpdateInvestment(string id, [FromBody] InvestmentClass investment)
        {
            if (string.IsNullOrEmpty(id) || investment == null)
                return BadRequest("ID o datos no válidos");
            InvestmentClass existingInvestment = _investmentRepository.Get(new InvestmentClass { id = id });
            if (existingInvestment == null)
                return NotFound("Investment no encontrado");
            _investmentRepository.Update(existingInvestment);
            return NoContent();
        }

        //DELETEs
        [HttpDelete("{id}")]
        public IActionResult DeleteInvestment(string id)
        {
            if(string.IsNullOrEmpty(id))
                return BadRequest("ID no válido");
            InvestmentClass existingInvestment = _investmentRepository.Get(new InvestmentClass { id = id });
            if (existingInvestment == null)
                return NotFound("Investment no encontrado");
            _investmentRepository.Delete(existingInvestment);
            return NoContent();
        }

        /*[HttpPut("{id}/percents")]
        public IActionResult UpdatePercents(string id)
        {
            try
            {
                InvestmentClass existingInvestment = _investmentRepository.Get(new InvestmentClass { id = id });
                if (existingInvestment == null)
                    return NotFound("La inversión no se encontró en Firestore.");

                // Actualiza el campo "percents"
                existingInvestment.percents = _investmentService.SetInvestmentPercents(
                    existingInvestment.expectedEfficiency,
                    existingInvestment.errorRange,
                    existingInvestment.fluctuations,
                    existingInvestment.randomizer
                );

                // Actualiza el registro en Firestore
                _investmentRepository.Update(existingInvestment);

                return NoContent();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error en UpdateInvestmentName: " + ex.Message);
                return BadRequest("Error al actualizar el campo 'percents' de la inversión.");
            }
        }*/
    }
}
