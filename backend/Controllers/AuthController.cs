using Backend.Models;
using Backend.Services;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(AppDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Usuario usuarioDto)
        {
            if (await _context.Usuarios.AnyAsync(u => u.Username == usuarioDto.Username))
                return BadRequest(new { mensaje = "El usuario ya existe" });

            var usuario = new Usuario
            {
                Username = usuarioDto.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(usuarioDto.Password)
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "Usuario registrado correctamente" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Usuario loginDto)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Username == loginDto.Username);
            if (usuario == null)
                return Unauthorized(new { mensaje = "Usuario o contraseña incorrectos" });

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, usuario.Password))
                return Unauthorized(new { mensaje = "Usuario o contraseña incorrectos" });

            var token = _jwtService.GenerarToken(usuario);
            return Ok(new { token });
        }
    }
}
