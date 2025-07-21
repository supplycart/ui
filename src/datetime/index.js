import moment from "moment-timezone";

export * from "./components";
export * from "./constants";

function displayDate(
    value,
    format = "YYYY-MM-DD HH:mm:ss",
    timezone = "Asia/Kuala_Lumpur",
    isUtc = false
) {
    // set default timezone as UTC
    moment.tz.setDefault("Etc/UTC");

    // return in utc format and specified timezone
    if (isUtc) {
        return moment(value).format(format) + moment().tz(timezone).format("Z");
    }

    // convert value into timezone local time
    return moment(value).tz(timezone).format(format);
}

export { displayDate };
