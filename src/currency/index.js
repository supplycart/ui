import Currencies, { DefaultCurrency } from "./constants/currencies";

export * from "./components";
export * from "./constants";

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
    const currencyObj = findCurrency(currency, decimal);
    const formatter = createFormatter(currencyObj, sign);
    const value = intValue
        ? amount
        : Math.round(amount * Math.pow(10, decimal));
    return formatter.format(value / Math.pow(10, currencyObj.precision));
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
