import { formatInTimeZone } from "date-fns-tz";

export * from "./components/index.js";
export * from "./constants/index.js";

function displayDate(
    value,
    format = "yyyy-MM-dd HH:mm:ss",
    timezone = "Asia/Kuala_Lumpur",
    isUtc = false,
) {
    if (!value) return "";

    const stringValue = String(value).trim();
    const hasExplicitTimezone =
        /(?:Z|[+-]\d{2}(?::?\d{2})?)$/i.test(stringValue) ||
        /\bGMT\b/i.test(stringValue);
    const isoValue = stringValue.includes("T")
        ? stringValue
        : stringValue.replace(" ", "T");
    const dateValue = new Date(hasExplicitTimezone ? isoValue : `${isoValue}Z`);

    if (isNaN(dateValue.getTime())) return "Invalid Date";

    try {
        const formatted = formatInTimeZone(dateValue, timezone, format);

        return isUtc
            ? `${formatted} ${formatInTimeZone(dateValue, timezone, "XXX")}`
            : formatted;
    } catch {
        return "Invalid Date";
    }
}

export { displayDate };
