using Microsoft.AspNetCore.Mvc;

namespace DoctorsWebApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View(); // This looks for Views/Home/Index.cshtml
        }
    }
}
