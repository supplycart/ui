import { find } from "lodash";

const currencies = [
    {
        country: "MALAYSIA",
        sign: "RM",
        name: "Ringgit",
        code: "MYR",
        precision: 2,
        format: "0,0.00",
        formatWithSign: "$0,0.00",
        locale: "en-MY",
    },
    {
        country: "MALAYSIA",
        sign: "RM",
        name: "Ringgit",
        code: "MYR",
        precision: 4,
        format: "0,0.0000",
        formatWithSign: "$0,0.0000",
        locale: "en-MY",
    },
    {
        country: "SINGAPORE",
        sign: "$",
        name: "Dollar",
        code: "SGD",
        precision: 2,
        format: "0,0.00",
        formatWithSign: "$0,0.00",
        locale: "en-SG",
    },
    {
        country: "SINGAPORE",
        sign: "$",
        name: "Dollar",
        code: "SGD",
        precision: 4,
        format: "0,0.0000",
        formatWithSign: "$0,0.0000",
        locale: "en-SG",
    },
    {
        country: "INDONESIA",
        sign: "Rp",
        name: "Rupiah",
        code: "IDR",
        precision: 0,
        format: "0,0",
        formatWithSign: "$0,0",
        locale: "id-ID",
    },
    {
        country: "THAILAND",
        sign: "฿",
        name: "Bath",
        code: "THB",
        precision: 2,
        format: "0,0.00",
        formatWithSign: "$0,0.00",
        locale: "th-TH",
    },
    {
        country: "THAILAND",
        sign: "฿",
        name: "Bath",
        code: "THB",
        precision: 4,
        format: "0,0.0000",
        formatWithSign: "$0,0.0000",
        locale: "th-TH",
    },
    {
        country: "VIETNAM",
        sign: "₫",
        name: "Dong",
        code: "VND",
        precision: 0,
        format: "0,0",
        formatWithSign: "0,0$",
        locale: "vi-VN",
    },
    {
        country: "HONG_KONG",
        sign: "HK$",
        name: "Dollar",
        code: "HKD",
        precision: 2,
        format: "0,0.00",
        formatWithSign: "$0,0.00",
        locale: "en-HK",
    },
    {
        country: "HONG_KONG",
        sign: "HK$",
        name: "Dollar",
        code: "HKD",
        precision: 4,
        format: "0,0.0000",
        formatWithSign: "$0,0.0000",
        locale: "en-HK",
    },
    {
        country: "PHILIPPINES",
        sign: "₱",
        name: "Peso",
        code: "PHP",
        precision: 2,
        format: "0,0.00",
        formatWithSign: "$0,0.00",
        locale: "en-PH",
    },
    {
        country: "PHILIPPINES",
        sign: "₱",
        name: "Peso",
        code: "PHP",
        precision: 4,
        format: "0,0.0000",
        formatWithSign: "$0,0.0000",
        locale: "en-PH",
    },
    {
        country: "CAMBODIA",
        sign: "៛",
        name: "Riel",
        code: "KHR",
        precision: 2,
        format: "0,0.00",
        formatWithSign: "$0,0.00",
        locale: "km-KH",
    },
    {
        country: "CAMBODIA",
        sign: "៛",
        name: "Riel",
        code: "KHR",
        precision: 4,
        format: "0,0.0000",
        formatWithSign: "$0,0.0000",
        locale: "km-KH",
    },
    {
        country: "AUSTRALIA",
        sign: "$",
        name: "Dollar",
        code: "AUD",
        precision: 2,
        format: "0,0.00",
        formatWithSign: "$0,0.00",
        locale: "en-AU",
    },
    {
        country: "AUSTRALIA",
        sign: "$",
        name: "Dollar",
        code: "AUD",
        precision: 4,
        format: "0,0.0000",
        formatWithSign: "$0,0.0000",
        locale: "en-AU",
    },
    {
        country: "UNITED STATES OF AMERICA",
        sign: "$",
        name: "Dollar",
        code: "USD",
        precision: 2,
        format: "0,0.00",
        formatWithSign: "$0,0.00",
        locale: "en-US",
    },
    {
        country: "UNITED STATES",
        sign: "$",
        name: "Dollar",
        code: "USD",
        precision: 4,
        format: "0,0.0000",
        formatWithSign: "$0,0.0000",
        locale: "en-US",
    },
    {
        country: "NEW ZEALAND",
        sign: "$",
        name: "Dollar",
        code: "NZD",
        precision: 2,
        format: "0,0.00",
        formatWithSign: "$0,0.00",
        locale: "en-NZ",
    },
    {
        country: "NEW ZEALAND",
        sign: "$",
        name: "Dollar",
        code: "NZD",
        precision: 4,
        format: "0,0.0000",
        formatWithSign: "$0,0.0000",
        locale: "en-NZ",
    },
    {
        country: "CHINA",
        sign: "¥",
        name: "Yuan",
        code: "CNY",
        precision: 0,
        format: "0,0",
        formatWithSign: "$0,0",
        locale: "zh-CN",
    },
    {
        sign: "£",
        name: "Pound Sterling",
        code: "GBP",
        precision: 2,
        format: "0,0.00",
        formatWithSign: "$0,0.00",
    },
    {
        sign: "£",
        name: "Pound Sterling",
        code: "GBP",
        precision: 4,
        format: "0,0.0000",
        formatWithSign: "$0,0.0000",
    },
    {
        sign: "€",
        name: "Euro",
        code: "EUR",
        precision: 2,
        format: "0,0.00",
        formatWithSign: "$0,0.00",
    },
    {
        sign: "€",
        name: "Euro",
        code: "EUR",
        precision: 4,
        format: "0,0.0000",
        formatWithSign: "$0,0.0000",
    },
];
const DefaultCurrency = find(currencies, (item) => item.code === "MYR");

export default currencies;
export { DefaultCurrency };
