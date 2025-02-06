import Dinero from "dinero.js";
import { find } from "lodash";
import Currencies, { DefaultCurrency } from "./constants/currencies";

export * from "./components";
export * from "./constants";

function parseValue(value) {
    if (value === null || value === undefined || value === '') {
        return 0;
    }
    // Handle string values
    if (typeof value === 'string') {
        // Remove any non-numeric characters except decimal point and minus
        value = value.replace(/[^\d.-]/g, '');
        return parseFloat(value) || 0;
    }
    // Handle number values
    return typeof value === 'number' ? value : 0;
}

function isInt(n) {
    return Number.isInteger(n);
}

function isFloat(n) {
    return Number(n) === n && !Number.isInteger(n);
}

function format(amount, currency, sign = false) {
    const currencyObj = findCurrency(currency);
    const formatter = createFormatter(currencyObj, sign);
    return formatter.format(amount / Math.pow(10, currencyObj.precision));
}

function formatCents(
    amount,
    currency,
    sign = false,
    intValue = true,
    decimal = 2
) {
    currency =
        typeof currency === "string"
            ? find(
                  Currencies,
                  (item) =>
                      (item.country === currency.toUpperCase() ||
                          item.code === currency) &&
                      item.precision === decimal
              )
            : currency;

    currency = currency ? currency : DefaultCurrency;

    const parsedAmount = parseValue(amount);
    const val = intValue
        ? Math.floor(parsedAmount)
        : Math.round(parsedAmount * Math.pow(10, decimal));

    const format = sign ? currency.formatWithSign : currency.format;

    return Dinero({
        amount: val,
        currency: currency.code,
        precision: currency.precision,
    })
        .setLocale(currency.locale)
        .toFormat(format);
}

function currency(countryCurrency, type) {
    const currencyObj = findCurrency(countryCurrency);
    return currencyObj[type];
}

function findCurrency(countryCurrency, precision) {
    if (typeof countryCurrency === "object") return countryCurrency;

    const found = Currencies.find(
        (item) =>
            item.country === countryCurrency?.toUpperCase() ||
            item.code === countryCurrency?.toUpperCase()
    );

    return found && (!precision || found.precision === precision)
        ? found
        : DefaultCurrency;
}

function createFormatter(currencyObj, sign) {
    return new Intl.NumberFormat(currencyObj.locale, {
        style: "currency",
        currency: currencyObj.code,
        minimumFractionDigits: currencyObj.precision,
        maximumFractionDigits: currencyObj.precision,
        signDisplay: sign ? "always" : "auto",
    });
}

export { isInt, isFloat, format, formatCents, currency };