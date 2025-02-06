import Dinero from "dinero.js";
import find from "lodash/find";
import Decimal from "decimal.js";
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
    try {
        const decimal = new Decimal(n);
        return decimal.isInteger();
    } catch (e) {
        return false;
    }
}

function isFloat(n) {
    try {
        const decimal = new Decimal(n);
        return !decimal.isInteger() && decimal.isFinite();
    } catch (e) {
        return false;
    }
}

function parseValue(value) {
    try {
        return new Decimal(value || 0);
    } catch (e) {
        return new Decimal(0);
    }
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

    // Convert to integer for Dinero
    const amountDecimal = parseValue(amount);
    const dineroAmount = parseInt(amountDecimal.toString());

    return Dinero({
        amount: dineroAmount,
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

    const amountDecimal = parseValue(amount);
    const powerTen = new Decimal(10).pow(decimal);

    // Calculate value with proper precision
    const val = intValue
        ? amountDecimal.floor()
        : amountDecimal.times(powerTen).round();

    const format = sign ? currency.formatWithSign : currency.format;

    // Convert to integer for Dinero
    const dineroAmount = parseInt(val.toString());

    return Dinero({
        amount: dineroAmount,
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

export { isInt, isFloat, format, formatCents, currency };