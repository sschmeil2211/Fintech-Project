using ASP.NET___Fintech_API.Models;
using ASP.NET___Fintech_API.Repositories;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NET___Fintech_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepository; 
        private readonly InvestmentRepository _investmentRepository;

        public UserController(UserRepository userRepository, InvestmentRepository investmentRepository)
        {
            _userRepository = userRepository;
            _investmentRepository = investmentRepository;
        }

        //GETs
        [HttpGet]
        public IActionResult GetAll()
        {
            List<UserClass> users = _userRepository.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("ID no válido");
            UserClass existingUser = _userRepository.Get(new UserClass() { id = id });
            if (existingUser == null)
                return NotFound("UserB no encontrado");
            return Ok(existingUser);
        }

        //POSTs
        [HttpPost]
        public IActionResult CreateUserSecurity([FromBody] UserCreateModel model)
        {
            if (model == null)
                return BadRequest("El objeto UserBankCreateModel es nulo");
            try
            {
                // Crear un nuevo usuario con las claves RSA generadas
                UserClass user = new()
                {
                    id = Guid.NewGuid().ToString(),
                    email = model.Email,
                    phone = model.Phone,
                    pinCode = model.PinCode,
                    firstName = model.FirstName,
                    lastName = model.LastName,
                    dni = model.DNI,
                    cuilCuit = model.CuilCuit,
                    genreType = model.GenreType,
                    address = model.Address,
                    addressNumber = model.AddressNumber,
                    apartmentNumber = model.ApartmentNumber,
                    floorNumber = model.FloorNumber,
                    postalCode = model.PostalCode,
                    civilStatusType = model.CivilStatusType,
                    nationalityType = model.NationalityType,
                    occupationType = model.OccupationType,
                    profileColor = model.ProfileColor,
                    balance = 1000, // Puedes configurar el saldo inicial aquí
                    contactIDs = new List<string>(),
                    transactionsIDs = new List<string>(),
                    userInvestmentIDs = new List<string>(),
                    userBankIDs = new List<string>(),
                    createdAt = Timestamp.GetCurrentTimestamp(),
                    updateAt = Timestamp.GetCurrentTimestamp()
                };
                // Guardar el usuario en la base de datos
                _userRepository.Create(user);
                return CreatedAtAction("GetUser", new { user.id }, user);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al crear UserBank: " + ex.Message);
                return StatusCode(500, "Error interno del servidor");
            }
        }

        //PUTs
        [HttpPut("{id}")]
        public IActionResult UpdateUser(string id, [FromBody] UserClass user)
        {
            if(string.IsNullOrEmpty(id) || user == null)
                return BadRequest("ID o datos no válidos");
            UserClass existingUser = _userRepository.Get(new UserClass { id = id }) ?? throw new InvalidOperationException("El usuario no se encontró en Firestore.");
            if (existingUser == null)
                return NotFound("User no encontrado");
            _userRepository.Update(existingUser);
            return NoContent();
        }

        //DELETEs
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest("ID no válido");
            UserClass existingUser = _userRepository.Get(new UserClass { id = id }) ?? throw new InvalidOperationException("El usuario no se encontró en Firestore.");
            if (existingUser == null)
                return NotFound("UserB no encontrado");
            _userRepository.Delete(existingUser);
            return NoContent();
        }
    }
}



/*[HttpGet("{id}/userInvestment")]
public IActionResult GetUserInvestments(string id)
{
    UserClass existingUser = _userRepository.Get(new UserClass { id = id }) ?? throw new InvalidOperationException("El usuario no se encontró en Firestore."); 
    return Ok(existingUser.userInvestment);
}



[HttpPost("{userId}/addUserToInvestment")]
public IActionResult AddUserToInvestment(string userId, [FromBody] UserInvestmentClass userToInvestmentModel)
{
    if (userToInvestmentModel == null)
        return BadRequest("El objeto UserToInvestmentModel es nulo");

    try
    {
        // Obtener el usuario y la inversión
        UserClass user = _userRepository.Get(new UserClass { id = userId });
        InvestmentClass investment = _investmentRepository.Get(new InvestmentClass { id = userToInvestmentModel.InvestmentId });

        if (user == null || investment == null)
            return NotFound("El usuario o la inversión no se encontraron en Firestore.");

        // Obtener datos actuales de usuario e inversión
        Dictionary<string, float> userData = user.userInvestment ?? new Dictionary<string, float>();
        List<string> investmentData = investment.users ?? new List<string>();

        // Actualizar datos
        if (userData.ContainsKey(userToInvestmentModel.InvestmentId) && investmentData.Contains(userId))
        {
            userData[userToInvestmentModel.InvestmentId] += userToInvestmentModel.value;
        }
        else
        {
            userData[userToInvestmentModel.InvestmentId] = userToInvestmentModel.value;
            investmentData.Add(userId);
        }

        // Actualizar usuario e inversión en Firestore
        user.userInvestment = userData;
        investment.users = investmentData;
        _userRepository.Update(user);
        _investmentRepository.Update(investment);

        Console.WriteLine("Campo actualizado correctamente");
        return Ok("Campo actualizado correctamente");
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error al actualizar el campo de inversiones del usuario: " + ex.Message);
        return BadRequest("Error al actualizar el campo de inversiones del usuario: " + ex.Message);
    }
} 

[HttpPut("{id}/updateInvestment")]
public IActionResult UpdateUserInvestment(string id, [FromBody] UserInvestmentClass updateModel)
{
    try
    {
        UserClass existingUser = _userRepository.Get(new UserClass { id = id }) ?? throw new InvalidOperationException("El usuario no se encontró en Firestore.");
        // Verifica si la inversión especificada existe en el campo userInvestment del usuario.
        if (!existingUser.userInvestment!.ContainsKey(updateModel.InvestmentId))
            return BadRequest("La inversión especificada no existe en el usuario.");
        // Obtiene el saldo actual de la inversión y resta el monto de retiro.
        float currentBalance = existingUser.userInvestment[updateModel.InvestmentId];
        float newBalance = currentBalance - updateModel.WithdrawalAmount;
        // Verifica si el saldo es suficiente para el retiro.
        if (newBalance < 0)
            return BadRequest("Saldo insuficiente para el retiro.");
        // Actualiza el saldo de la inversión en el campo userInvestment del usuario.
        existingUser.userInvestment[updateModel.InvestmentId] = newBalance;
        existingUser.balance += newBalance;
        // Actualiza el usuario en Firestore.
        _userRepository.Update(existingUser);
        return Ok(new { message = "Retiro exitoso", newBalance });
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error en UpdateUserInvestment: " + ex.Message);
        return BadRequest("Error al actualizar el campo 'userInvestment' del usuario.");
    }
}*/