<template>
    <span>{{ formattedMoney }}</span>
</template>

<script setup>
import { computed, defineProps } from "vue";
import find from "lodash/find"
import Currencies, {
    DefaultCurrency,
    NoCentsCurrencies,
} from "../constants/currencies";
import { format as formatMoney } from "../index";

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
        const currencyCodeCountry = NoCentsCurrencies.flatMap((item) => [
            item.code,
            item.country,
        ]);
        return currencyCodeCountry.includes(props.currency.toUpperCase());
    }
    return false;
});

const formattedMoney = computed(() => {
    const precision = noCentCurrency.value ? 0 : props.decimal;

    let currency =
        typeof props.currency === "string"
            ? find(
                  Currencies,
                  (item) =>
                      (item.country === props.currency.toUpperCase() ||
                          item.code === props.currency) &&
                      item.precision === precision
              )
            : props.currency;

    currency = currency || DefaultCurrency;

    const value = noCentCurrency.value
        ? Number(props.value) / Math.pow(10, props.decimal)
        : props.value;

    const amount = props.intValue
        ? Number(value)
        : Number(value) * Math.pow(10, props.decimal);

    return formatMoney(amount, currency, props.sign);
});
</script>
