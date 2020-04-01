import Dinero from "dinero.js";
import { find } from "lodash";
import Currencies, { DefaultCurrency } from "./constants/currencies";

export * from "./components";
export * from "./constants";

function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

function format(amount, currency, sign = false) {
    currency = typeof currency === "string"
        ? find(Currencies, item => item.country === currency.toUpperCase() || item.code === currency)
        : currency;

    currency = currency ? currency : DefaultCurrency;

    let format = sign ? currency.formatWithSign : currency.format;

    return Dinero({
        amount: amount,
        currency: currency.code,
        precision: currency.precision
    }).setLocale(currency.locale).toFormat(format);
}

export { isInt, isFloat, format };