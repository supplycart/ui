<script setup>
import { computed } from "vue"
import CurrencySettings from "../constants/currencySettings"

// Define props
const props = defineProps({
    type: {
        type: String,
        default: "sign",
    },
    currency: {
        type: [String, Object],
        default: "MYR",
    },
})

// Computed currency data
const currencyData = computed(() => {
    let currency = typeof props.currency === "object"
        ? props.currency
        : CurrencySettings[props.currency]

    if (!currency) {
        currency = CurrencySettings["MYR"]
    }

    return currency
})

// Define options
defineOptions({
    name: "Currency"
})
</script>

<template>
    <span>{{ currencyData[type] }}</span>
</template>

<style scoped></style>
