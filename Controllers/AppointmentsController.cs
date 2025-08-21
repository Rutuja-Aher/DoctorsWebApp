using DoctorsWebApp.Data;
using Microsoft.AspNetCore.Mvc;
using DoctorsWebApp.Models;
namespace DoctorsWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppointmentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/appointments
        [HttpGet]
        public IActionResult GetAppointments()
        {
            var appointments = _context.Appointments.ToList();
            return Ok(appointments);
        }

        // POST: api/appointments
        [HttpPost]
        public IActionResult AddAppointment([FromBody] Appointment appointment)
        {
            if (appointment.Date < DateTime.Today)
            {
                return BadRequest("Appointment not found.");
            }

            _context.Appointments.Add(appointment);
            _context.SaveChanges();
            return Ok(appointment);
        }

        // PUT: api/appointments/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateAppointment(int id, [FromBody] Appointment updated)
        {
            var existing = _context.Appointments.FirstOrDefault(a => a.Id == id);
            if (existing == null)
            {
                return NotFound("Appointment not found.");
            }

            // Update values
            existing.PatientName = updated.PatientName;
            existing.DoctorName = updated.DoctorName;
            existing.Date = updated.Date;
            existing.Time = updated.Time;

            _context.SaveChanges();
            return Ok(existing);
        }
    }
}
