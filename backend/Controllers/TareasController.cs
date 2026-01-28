using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TareasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TareasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/tareas
        [HttpGet]
        public async Task<IActionResult> GetTareas()
        {
            // Obtener el Id del usuario desde el token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();

            if (!int.TryParse(userIdClaim.Value, out int userId))
                return Unauthorized();

            var tareas = await _context.Tareas
                .Where(t => t.UsuarioId == userId)
                .ToListAsync();

            return Ok(tareas);
        }

        // POST: api/tareas
        [HttpPost]
        public async Task<IActionResult> CrearTarea([FromBody] Tarea tarea)
        {
            // Validación básica del body
            if (tarea == null || string.IsNullOrWhiteSpace(tarea.Titulo) || string.IsNullOrWhiteSpace(tarea.Descripcion))
                return BadRequest(new { mensaje = "Debe enviar Titulo y Descripcion de la tarea" });

            // Obtener el Id del usuario desde el token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();

            if (!int.TryParse(userIdClaim.Value, out int userId))
                return Unauthorized();

            // Asignar el usuario a la tarea
            tarea.UsuarioId = userId;

            // Guardar en la base de datos
            _context.Tareas.Add(tarea);
            await _context.SaveChangesAsync();

            return Ok(tarea);
        }
    }
}
