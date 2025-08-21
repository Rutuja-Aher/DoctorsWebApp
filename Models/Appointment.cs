using System.ComponentModel.DataAnnotations;
namespace DoctorsWebApp.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [Required, StringLength(80)]
        public string PatientName { get; set; } = "";

        [Required, StringLength(80)]
        public string DoctorName { get; set; } = "";

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TimeSpan  Time { get; set; } 
    }
}