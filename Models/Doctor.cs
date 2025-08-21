using System.ComponentModel.DataAnnotations;
namespace DoctorsWebApp.Models
{
    public class Doctor
    {
        public int Id { get; set; }

        [Required, StringLength(80)]
        public string Name { get; set; } = "";

        [Required, StringLength(120)]
        public string Specialization { get; set; } = "";

        [Required, RegularExpression("Male|Female")]
        public string Gender { get; set; } = "";

        [Required, Phone]
        public string Contact { get; set; } = "";
    }
}