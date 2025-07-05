import { format, parseISO } from "date-fns";
import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";

export * from "./components";
export * from "./constants";

function displayDate(
    value,
    formatString = "yyyy-MM-dd HH:mm:ss",
    timezone = "Asia/Kuala_Lumpur",
    isUtc = false,
) {
    if (!value) return "";

    let dateValue;

    // Ensure the date is correctly interpreted as UTC if needed
    if (value.endsWith("Z") || value.includes("GMT")) {
        dateValue = new Date(value);
    } else {
        // Treat as local time (assumed to be in system timezone)
        dateValue = new Date(`${value}Z`); // Assume UTC to avoid local misinterpretation
    }

    if (isNaN(dateValue.getTime())) return "Invalid Date";

    // Convert to target timezone
    const zonedDate = utcToZonedTime(dateValue, timezone);

    // Handle UTC conversion if isUtc is true
    if (isUtc) {
        const utcDate = zonedTimeToUtc(zonedDate, timezone);
        return format(utcDate, formatString) + " " + format(utcDate, "XXX");
    }

    return format(zonedDate, formatString);
}

export { displayDate };
