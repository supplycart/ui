import Dinero from "dinero.js";
import { find } from "lodash";
import numeral from "numeral";
import Currencies, {
    DefaultCurrency,
    NoCentsCurrencies,
} from "./constants/currencies";

export * from "./components";
export * from "./constants";

function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

function format(amount, currency, sign = false) {
    currency =
        typeof currency === "string"
            ? find(
                  Currencies,
                  (item) =>
                      item.country === currency.toUpperCase() ||
                      item.code === currency
              )
            : currency;

    currency = currency ? currency : DefaultCurrency;

    const format = sign ? currency.formatWithSign : currency.format;

    return Dinero({
        amount: amount,
        currency: currency.code,
        precision: currency.precision,
    })
        .setLocale(currency.locale)
        .toFormat(format);
}

function formatCents(
    amount,
    currency,
    sign = false,
    intValue = true,
    decimal = 2,
    currencyformat = null,
    convertPrecision = 2
) {
    let precision = decimal;
    // to check for currencies that has no precision
    if (typeof currency === "string") {
        const currencyCodeCountry = [];
        NoCentsCurrencies.forEach((item) => {
            currencyCodeCountry.push(item.code);
            currencyCodeCountry.push(item.country);
        });

        if (currencyCodeCountry.includes(currency)) {
            precision = 0;
        }
    }
    currency =
        typeof currency === "string"
            ? find(
                  Currencies,
                  (item) =>
                      (item.country === currency.toUpperCase() ||
                          item.code === currency) &&
                      item.precision === precision
              )
            : currency;

    currency = currency ? currency : DefaultCurrency;

    const val = intValue
        ? numeral(amount).value()
        : numeral(amount).multiply(Math.pow(10, decimal)).value();

    const format = currencyformat
        ? currencyformat
        : sign
        ? currency.formatWithSign
        : currency.format;

    return Dinero({
        amount: val,
        currency: currency.code,
        precision: currency.precision,
    })
        .convertPrecision(convertPrecision, "HALF_UP")
        .setLocale(currency.locale)
        .toFormat(format);
}

function currency(countryCurrency, type) {
    let currency =
        typeof countryCurrency === "object"
            ? countryCurrency
            : Currencies.find(
                  (item) =>
                      item.country === countryCurrency.toUpperCase() ||
                      item.code === countryCurrency.toUpperCase()
              );

    if (!currency) {
        currency = DefaultCurrency;
    }

    return currency[type];
}

export {
    isInt,
    isFloat,
    format,
    formatCents,
    currency,
    Currencies,
    DefaultCurrency,
    NoCentsCurrencies,
};
