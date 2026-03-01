using Microsoft.AspNetCore.Mvc;
using SpaceDashboard.Api.Models;

namespace SpaceDashboard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AlertsController : ControllerBase
{
    private static readonly List<SystemAlert> _alerts = new()
    {
        new(1, "critical", "MUOS-5 battery below 50% threshold",          "MUOS-5",    DateTime.UtcNow.AddMinutes(-22), false),
        new(2, "serious",  "NROL-44 telemetry link lost",                  "NROL-44",   DateTime.UtcNow.AddHours(-3),   false),
        new(3, "caution",  "WGS-11 signal degraded — atmospheric scatter", "WGS-11",    DateTime.UtcNow.AddMinutes(-45), false),
        new(4, "normal",   "GPS-IIF-3 orbit adjustment complete",          "GPS-IIF-3", DateTime.UtcNow.AddHours(-1),   true),
        new(5, "caution",  "Scheduled maintenance window in 2 hours",      "AEHF-1",    DateTime.UtcNow.AddMinutes(-10), true),
    };

    [HttpGet]
    public ActionResult<IEnumerable<SystemAlert>> GetAll() => Ok(_alerts);

    [HttpPatch("{id}/acknowledge")]
    public ActionResult Acknowledge(int id)
    {
        var idx = _alerts.FindIndex(a => a.Id == id);
        if (idx < 0) return NotFound();
        _alerts[idx] = _alerts[idx] with { Acknowledged = true };
        return NoContent();
    }
}
