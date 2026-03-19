using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// ajouter le support des controllers
builder.Services.AddControllers();
var app = builder.Build();

// Permet de servir les fichiers statiques depuis wwwroot
app.UseDefaultFiles(); // Active index.html comme page par défaut
app.UseStaticFiles();

// mapper les controllers
app.MapControllers();


app.Run();
