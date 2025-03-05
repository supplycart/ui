import { format, parseISO } from "date-fns";
import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";

export * from "./components";
export * from "./constants";

function displayDate(
    value,
    formatString = "yyyy-MM-dd HH:mm:ss",
    timezone = "Asia/Kuala_Lumpur",
    isUtc = false
) {
    // Convert the value to a Date object
    const dateValue =
        typeof value === "string" ? parseISO(value) : new Date(value);

    // If isUtc is true, convert to UTC and format
    if (isUtc) {
        const utcDate = zonedTimeToUtc(dateValue, timezone);
        return `${format(utcDate, formatString)} ${format(utcDate, "XXX")}`;
    }

    // Convert value into timezone local time and format
    const zonedDate = utcToZonedTime(dateValue, timezone);
    return format(zonedDate, formatString);
}

export { displayDate };
