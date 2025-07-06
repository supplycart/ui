<script setup>
import { h, computed } from "vue";
import Dinero from "dinero.js";
import { find } from "lodash-es";
import numeral from "numeral";
import Currencies, {
    DefaultCurrency,
    NoCentsCurrencies,
} from "../constants/currencies.js";

const props = defineProps({
    value: {
        type: [String, Number],
        default: () => "0.00",
    },
    currency: {
        type: [String, Object],
        default: null,
    },
    decimal: {
        type: Number,
        default: 2,
    },
    convertPrecision: {
        type: Number,
        default: 2,
    },
    sign: {
        type: Boolean,
        default: false,
    },
    format: {
        type: String,
        default: null,
    },
    intValue: {
        type: Boolean,
        default: true,
    },
});

const noCentCurrency = computed(() => {
    if (typeof props.currency === "string") {
        const currencyCodeCountry = [];
        NoCentsCurrencies.forEach((item) => {
            currencyCodeCountry.push(item.code);
            currencyCodeCountry.push(item.country);
        });

        if (currencyCodeCountry.includes(props.currency)) {
            return true;
        }
    }
    return false;
});

const renderMoney = () => {
    const precision = noCentCurrency.value ? 0 : props.decimal;

    let currency =
        typeof props.currency === "string"
            ? find(
                  Currencies,
                  (item) =>
                      (item.country === props.currency.toUpperCase() ||
                          item.code === props.currency) &&
                      item.precision === precision,
              )
            : props.currency;

    currency = currency ? currency : DefaultCurrency;

    const alteredValue = noCentCurrency.value
        ? numeral(props.value).divide(Math.pow(10, props.decimal)).value()
        : props.value;

    const val = props.intValue
        ? numeral(alteredValue).value()
        : numeral(alteredValue)
              .multiply(Math.pow(10, props.decimal))
              .value();

    const format = props.format
        ? props.format
        : props.sign
          ? currency.formatWithSign
          : currency.format;

    if (currency.code === "EUR" || currency.code === "GBP") {
        return h(
            "span",
            Dinero({
                amount: val,
                currency: currency.code,
                precision: currency.precision,
            })
                .convertPrecision(props.convertPrecision, "HALF_UP")
                .toFormat(format),
        );
    } else {
        return h(
            "span",
            Dinero({
                amount: val,
                currency: currency.code,
                precision: currency.precision,
            })
                .convertPrecision(props.convertPrecision, "HALF_UP")
                .setLocale(currency.locale)
                .toFormat(format),
        );
    }
};
</script>

<template>
    <component :is="renderMoney" />
</template>
