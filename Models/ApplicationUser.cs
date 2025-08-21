using Microsoft.AspNetCore.Identity;

namespace DoctorsWebApp.Models
{
    public class ApplicationUser : IdentityUser
    {
        // Extra fields you want for your system users (not doctors/patients directly)
        public string FullName { get; set; } = "";  
        public string Role { get; set; } = "";       // Admin / Receptionist / Doctor etc.
    }
}
