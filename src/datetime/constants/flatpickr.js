import { format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

const timeZone = "UTC";

const DefaultConfig = {
    altInput: true,
    altFormat: "j M Y",
    dateFormat: "Z",
    minDate: format(zonedTimeToUtc(new Date(), timeZone), "yyyy-MM-dd"),
};

const DefaultDateRangeConfig = {
    altInput: true,
    altFormat: "j M Y",
    dateFormat: "Z",
    minDate: format(zonedTimeToUtc(new Date(), timeZone), "yyyy-MM-dd"),
    mode: "range",
};

const DefaultTimeConfig = {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
};

export { DefaultConfig, DefaultDateRangeConfig, DefaultTimeConfig };
