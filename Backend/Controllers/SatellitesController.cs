using Microsoft.AspNetCore.Mvc;
using SpaceDashboard.Api.Models;

namespace SpaceDashboard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SatellitesController : ControllerBase
{
    private static readonly List<Satellite> _satellites = new()
    {
        new(1, "AEHF-1",    "Active",   "GEO",  0.0,   -130.0, 35786, "Strong",   92, DateTime.UtcNow.AddMinutes(-3)),
        new(2, "AEHF-2",    "Active",   "GEO",  0.0,   -105.0, 35786, "Strong",   88, DateTime.UtcNow.AddMinutes(-1)),
        new(3, "WGS-11",    "Active",   "GEO",  0.0,    172.0, 35786, "Moderate", 76, DateTime.UtcNow.AddMinutes(-7)),
        new(4, "GPS-IIF-3", "Active",   "MEO",  32.1,   -67.4, 20200, "Strong",   95, DateTime.UtcNow.AddMinutes(-2)),
        new(5, "GPS-IIF-7", "Active",   "MEO",  -15.3,  120.8, 20200, "Strong",   91, DateTime.UtcNow.AddMinutes(-4)),
        new(6, "MUOS-5",    "Degraded", "GEO",  0.0,    75.0,  35786, "Weak",     43, DateTime.UtcNow.AddMinutes(-22)),
        new(7, "WGS-9",     "Active",   "GEO",  0.0,   -11.5,  35786, "Strong",   82, DateTime.UtcNow.AddMinutes(-6)),
        new(8, "SBIRS-GEO-1","Active",  "GEO",  0.0,   -135.0, 35786, "Strong",   89, DateTime.UtcNow.AddMinutes(-5)),
        new(9, "NROL-44",   "Offline",  "LEO",  51.6,   22.3,   550,  "None",     12, DateTime.UtcNow.AddHours(-3)),
        new(10,"CERES-1",   "Active",   "LEO",  -45.2,  88.7,   620,  "Moderate", 68, DateTime.UtcNow.AddMinutes(-9)),
    };

    [HttpGet]
    public ActionResult<IEnumerable<Satellite>> GetAll() => Ok(_satellites);

    [HttpGet("{id}")]
    public ActionResult<Satellite> GetById(int id)
    {
        var sat = _satellites.FirstOrDefault(s => s.Id == id);
        return sat is null ? NotFound() : Ok(sat);
    }

    [HttpGet("stats")]
    public ActionResult<DashboardStats> GetStats()
    {
        return Ok(new DashboardStats(
            TotalSatellites: _satellites.Count,
            ActiveSatellites: _satellites.Count(s => s.Status == "Active"),
            AlertCount: _satellites.Count(s => s.Status is "Degraded" or "Offline"),
            ContactsToday: 14
        ));
    }
}
