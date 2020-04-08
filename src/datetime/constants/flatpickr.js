import moment from "moment";

const DefaultConfig = {
    altInput: true,
    altFormat: "j M Y",
    dateFormat: "Y-m-d",
    minDate: moment().format("YYYY-MM-DD")
};

const DefaultDateRangeConfig = {
    altInput: true,
    altFormat: "j M Y",
    dateFormat: "Y-m-d",
    minDate: moment().format("YYYY-MM-DD"),
    mode: "range"
};

const DefaultTimeConfig = {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
};

export {DefaultConfig, DefaultDateRangeConfig, DefaultTimeConfig};
