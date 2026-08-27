<script setup>
import { h, computed } from "vue";
import numeral from "numeral";
import CurrencySettings from "../constants/currencySettings.js";

const props = defineProps({
    decimal: {
        type: Number,
        default: 2,
    },
    currency: {
        type: [String, Object],
        default: "MYR",
    },
    modelValue: {
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
        typeof props.currency == "object"
            ? props.currency.code
            : props.currency;
    return Object.keys(CurrencySettings).includes(currencyStr)
        ? currencyStr
        : "MYR";
});

const currencySign = computed(() => {
    return CurrencySettings[currentCurrency.value]["sign"];
});

const currencySignPos = computed(() => {
    return CurrencySettings[currentCurrency.value]["signPosition"];
});

const displayFormat = computed(() => {
    return props.format
        ? props.format
        : CurrencySettings[currentCurrency.value]["displayFormat"];
});

const displayValue = computed(() => {
    let processedVal = numeral(props.modelValue)
        .divide(Math.pow(10, props.decimal))
        .value();

    if (props.convertPrecision > -1) {
        processedVal = processedVal.toFixed(props.convertPrecision);
    }
    return (
        (props.withSign && currencySignPos.value == "BEFORE"
            ? `${currencySign.value} `
            : "") +
        numeral(processedVal).format(displayFormat.value) +
        (props.withSign && currencySignPos.value == "AFTER"
            ? ` ${currencySign.value}`
            : "")
    );
});

const renderMoney = () => {
    return h("span", displayValue.value);
};
</script>

<template>
    <component :is="renderMoney" />
</template>

<style></style>
