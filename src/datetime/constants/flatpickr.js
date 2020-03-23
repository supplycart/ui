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

export { DefaultConfig, DefaultDateRangeConfig };