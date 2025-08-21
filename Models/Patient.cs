using System.ComponentModel.DataAnnotations;
namespace DoctorsWebApp.Models
{
    public class Patient
    {
        public int Id { get; set; }

        [Required, StringLength(80)]
        public string Name { get; set; } = "";

        [Range(0, 120)]
        public int Age { get; set; }

        [Required, RegularExpression("Male|Female", ErrorMessage = "Gender must be Male or Female")]
        public string Gender { get; set; } = "";

        [Required, Phone]
        public string ContactNumber { get; set; } = "";
    }
}