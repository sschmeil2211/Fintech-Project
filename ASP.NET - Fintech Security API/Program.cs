using ASP.NET___Fintech_API.Repositories;
using ASP.NET___Fintech_API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); 

builder.Services.AddScoped<InvestmentRepository>();
builder.Services.AddScoped<InvestmentService>();

builder.Services.AddScoped<UserInvestmentRepository>();

builder.Services.AddScoped<TransactionRepository>();

builder.Services.AddScoped<UserRepository>();

builder.Services.AddScoped<KeyRepository>();
builder.Services.AddScoped<KeyService>();

builder.Services.AddScoped<UserBankRepository>();
builder.Services.AddScoped<UserBankService>();

builder.Services.AddScoped<BankRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
} 
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
