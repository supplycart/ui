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
            locale: "en-MY"
        }, {
            country: "SINGAPORE",
            sign: "$",
            name: "Dollar",
            code: "SGD",
            precision: 2,
            format: "0,0.00",
            formatWithSign: "$0,0.00",
            locale: "en-SG"
        },
        {
            country: "INDONESIA",
            sign: "Rp",
            name: "Rupiah",
            code: "IDR",
            precision: 0,
            format: "0,0",
            formatWithSign: "$0,0",
            locale: "id-ID"
        },
        {
            country: "THAILAND",
            sign: "฿",
            name: "Bath",
            code: "THB",
            precision: 2,
            format: "0,0.00",
            formatWithSign: "$0,0.00",
            locale: "th-TH"
        },
        {
            country: "VIETNAM",
            sign: "₫",
            name: "Dong",
            code: "VND",
            precision: 0,
            format: "0,0",
            formatWithSign: "0,0$",
            locale: "vi-VN"
        },
        {
            country: "HONG_KONG",
            sign: "$",
            name: "Dollar",
            code: "HKD",
            precision: 2,
            format: "0,0.00",
            formatWithSign: "$0,0.00",
            locale: "en-HK"
        },
        {
            country: "PHILIPPINES",
            sign: "₱",
            name: "Peso",
            code: "PHP",
            precision: 2,
            format: "0,0.00",
            formatWithSign: "$0,0.00",
            locale: "en-PH"
        },
        {
            country: "CAMBODIA",
            sign: "៛",
            name: "Riel",
            code: "KHR",
            precision: 2,
            format: "0,0.00",
            formatWithSign: "$0,0.00",
            locale: "km-KH"
        }
    ]
;

const DefaultCurrency = find(currencies, item => item.code === "MYR");

export default currencies;
export { DefaultCurrency };
