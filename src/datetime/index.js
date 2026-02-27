import { format, parseISO } from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

export * from "./components";
export * from "./constants";

function displayDate(
    value,
    format = "YYYY-MM-DD HH:mm:ss",
    timezone = "Asia/Kuala_Lumpur",
    isUtc = false,
) {
    // set default timezone as UTC
    moment.tz.setDefault("Etc/UTC");

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
    const zonedDate = fromZonedTime(dateValue, timezone);

    // Handle UTC conversion if isUtc is true
    if (isUtc) {
        const utcDate = toZonedTime(zonedDate, timezone);
        return format(utcDate, formatString) + " " + format(utcDate, "XXX");
    }

    // convert value into timezone local time
    return moment(value).tz(timezone).format(format);
}

export { displayDate };
