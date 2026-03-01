using Microsoft.AspNetCore.Mvc;
using SpaceDashboard.Api.Models;

namespace SpaceDashboard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactsController : ControllerBase
{
    private static readonly List<ContactWindow> _contacts = new()
    {
        new(1, "AEHF-1",    "Schriever AFB",     DateTime.UtcNow.AddMinutes(-15), DateTime.UtcNow.AddMinutes(45),  "Active"),
        new(2, "GPS-IIF-7", "Vandenberg SFB",    DateTime.UtcNow.AddMinutes(10),  DateTime.UtcNow.AddMinutes(60),  "Upcoming"),
        new(3, "WGS-9",     "Kapaun AS",         DateTime.UtcNow.AddMinutes(30),  DateTime.UtcNow.AddMinutes(90),  "Upcoming"),
        new(4, "AEHF-2",    "Schriever AFB",     DateTime.UtcNow.AddHours(-2),    DateTime.UtcNow.AddHours(-1),    "Complete"),
        new(5, "SBIRS-GEO-1","Buckley SFB",      DateTime.UtcNow.AddHours(2),     DateTime.UtcNow.AddHours(3),     "Upcoming"),
    };

    [HttpGet]
    public ActionResult<IEnumerable<ContactWindow>> GetAll() => Ok(_contacts);
}
