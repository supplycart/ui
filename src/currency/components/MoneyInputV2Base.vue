<template>
    <div>
        <input
            v-if="!editing"
            type="text"
            class="border border-gray-300 rounded p-2 text-right"
            :disabled="disabled"
            :placeholder="placeholder"
            :value="displayValue"
            @focus="onFocus"
        />
        <input
            v-if="editing"
            type="text"
            class="border border-red-300 rounded p-2 text-right"
            :placeholder="placeholder"
            :value="inputValue"
            @blur="onBlur"
            @input="onInput"
            @keydown="onKeydown"
        />
    </div>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits } from "vue";
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
    disabled: {
        type: Boolean,
        default: false,
    },
    format: {
        type: String,
        default: null,
    },
    allowNegative: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: null,
    },
});

const emit = defineEmits(["input", "keydown"]);

const editing = ref(false);
const rawValue = ref(props.value ?? 0);

watch(
    () => props.value,
    (newValue) => {
        rawValue.value = newValue ?? 0;
    }
);

const inputValue = computed({
    get() {
        return (rawValue.value / Math.pow(10, props.decimal)).toFixed(
            props.decimal
        );
    },
    set(value) {
        const newValue = Number(value) * Math.pow(10, props.decimal);
        rawValue.value = Math.round(newValue); // Ensure rounding to avoid floating-point precision issues
        emit("input", rawValue.value);
    },
});

const currentCurrency = computed(() => {
    const currencyStr =
        typeof props.currency === "object"
            ? props.currency.code
            : props.currency;
    return CurrencySettings[currencyStr] ? currencyStr : "MYR";
});

const currencySign = computed(() => {
    return CurrencySettings[currentCurrency.value].sign;
});

const currencySignPos = computed(() => {
    return CurrencySettings[currentCurrency.value].signPosition;
});

const displayValue = computed(() => {
    const formattedValue = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: props.decimal,
        maximumFractionDigits: props.decimal,
    }).format(inputValue.value);
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

const onFocus = () => {
    editing.value = true;
    setTimeout(() => {
        const input = document.querySelector("input");
        input.focus();
        input.select();
    }, 0);
};

const onBlur = () => {
    editing.value = false;
    let emitVal = rawValue.value;
    if (!props.allowNegative && rawValue.value < 0) {
        emitVal = Math.abs(emitVal);
        inputValue.value = Math.abs(inputValue.value);
        emit("input", emitVal);
    }
};

const onInput = (e) => {
    inputValue.value = e.target.value;
};

const onKeydown = () => {
    emit("keydown");
};
</script>

<style></style>
