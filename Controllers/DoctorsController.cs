using Microsoft.AspNetCore.Mvc;
using DoctorsWebApp.Data;
using DoctorsWebApp.Models;
using System.Linq;

namespace DoctorsWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DoctorsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetDoctors()
        {
            var doctors = _context.Doctors.ToList();
            return Ok(doctors); // returns JSON
        }

        [HttpPost]
        public IActionResult AddDoctors([FromBody] Doctor doctor)
        {
            try
            {
                _context.Doctors.Add(doctor); // ✅ fixed
                _context.SaveChanges();
                return Ok(doctor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Server error: " + ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateDoctor(int id, [FromBody] Doctor updated)
        {
            var doctor = _context.Doctors.FirstOrDefault(p => p.Id == id);
            if (doctor == null)
                return NotFound("Doctor not found.");

            // Update values
            doctor.Name = updated.Name;
            doctor.Specialization = updated.Specialization;
            doctor.Gender = updated.Gender;
            doctor.Contact = updated.Contact;

            
            _context.SaveChanges(); // ✅ required

            return Ok(doctor);
        
        }
    }
}
