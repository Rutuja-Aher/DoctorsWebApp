using Microsoft.AspNetCore.Mvc;
using DoctorsWebApp.Models;
using DoctorsWebApp.Data;

namespace DoctorsWebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PatientsController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public IActionResult AddPatient([FromBody] Patient patient)
        {
            if (patient == null || string.IsNullOrEmpty(patient.Name))
                return BadRequest("Invalid patient data.");

            _context.Patients.Add(patient);
            _context.SaveChanges();
            return Ok(patient);
        }


        [HttpGet]
        public IActionResult GetPatients()
        {
            return Ok(_context.Patients.ToList());
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePatient(int id, [FromBody] Patient updated)
        {
            var patient = _context.Patients.FirstOrDefault(p => p.Id == id);
            if (patient == null) return NotFound("Patient not found.");

            patient.Name = updated.Name;
            patient.Age = updated.Age;
            patient.Gender = updated.Gender;
            patient.ContactNumber = updated.ContactNumber;

            _context.SaveChanges();
            return Ok(patient);
        }

    }
}
