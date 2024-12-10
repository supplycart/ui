<template>
    <span>{{ displayValue }}</span>
</template>

<script setup>
import { computed, defineProps } from "vue";
import CurrencySettings from "../constants/currencySettings";

const props = defineProps({
    decimal: {
        type: Number,
        default: 2,
    },
    currency: {
        type: [String, Object],
        default: "MYR",
    },
    value: {
        type: Number,
        default: 0,
    },
    withSign: {
        type: Boolean,
        default: false,
    },
    format: {
        type: String,
        default: null,
    },
    convertPrecision: {
        type: Number,
        default: -1,
    },
});

const currentCurrency = computed(() => {
    const currencyStr =
        typeof props.currency === "object"
            ? props.currency.code
            : props.currency;
    return CurrencySettings[currencyStr] ? currencyStr : "MYR";
});

const currencySign = computed(
    () => CurrencySettings[currentCurrency.value].sign
);

const currencySignPos = computed(
    () => CurrencySettings[currentCurrency.value].signPosition
);

const formatNumber = (number, decimal) => {
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimal,
        maximumFractionDigits: decimal,
    }).format(number);
};

const displayValue = computed(() => {
    let processedVal = props.value / Math.pow(10, props.decimal);

    if (props.convertPrecision > -1) {
        processedVal = processedVal.toFixed(props.convertPrecision);
    }

    const formattedValue = formatNumber(processedVal, props.decimal);

    return (
        (props.withSign && currencySignPos.value === "BEFORE"
            ? `${currencySign.value} `
            : "") +
        formattedValue +
        (props.withSign && currencySignPos.value === "AFTER"
            ? ` ${currencySign.value}`
            : "")
    );
});
</script>

<style></style>
