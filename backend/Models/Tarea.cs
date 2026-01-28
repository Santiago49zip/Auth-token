namespace Backend.Models
{
    public class Tarea
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public bool Completada { get; set; } = false;

        // Relación con usuario
        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }
    }
}
