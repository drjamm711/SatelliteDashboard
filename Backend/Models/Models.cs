namespace SpaceDashboard.Api.Models;

public record Satellite(
    int Id,
    string Name,
    string Status,
    string Orbit,
    double Latitude,
    double Longitude,
    double Altitude,
    string Signal,
    int BatteryLevel,
    DateTime LastContact
);

public record SystemAlert(
    int Id,
    string Severity,
    string Message,
    string Source,
    DateTime Timestamp,
    bool Acknowledged
);

public record ContactWindow(
    int Id,
    string Satellite,
    string GroundStation,
    DateTime StartTime,
    DateTime EndTime,
    string Status
);

public record DashboardStats(
    int TotalSatellites,
    int ActiveSatellites,
    int AlertCount,
    int ContactsToday
);
