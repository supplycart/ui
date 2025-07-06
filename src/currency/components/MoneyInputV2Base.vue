<script setup>
import { computed, ref, nextTick, getCurrentInstance } from "vue";
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

const emit = defineEmits(["update:modelValue", "input", "keydown"]);

const editing = ref(false);
const inputRef = ref(null);
const instance = getCurrentInstance();

const rawValue = computed({
    get() {
        const currentValue =
            props.modelValue !== undefined
                ? props.modelValue
                : props.value;
        return currentValue ?? 0;
    },
    set(val) {
        emit("update:modelValue", val);
        emit("input", val);
    },
});

const inputValue = computed({
    get() {
        return numeral(rawValue.value)
            .divide(Math.pow(10, props.decimal))
            .value();
    },
    set(value) {
        rawValue.value = Number(
            numeral(value)
                .multiply(Math.pow(10, props.decimal))
                .value()
                .toFixed(props.decimal),
        );
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

const displayFormat = computed(() => {
    return props.format
        ? props.format
        : CurrencySettings[currentCurrency.value]["displayFormat"];
});

const inputFormat = computed(() => {
    return CurrencySettings[currentCurrency.value]["inputFormat"];
});

const currencySign = computed(() => {
    return CurrencySettings[currentCurrency.value]["sign"];
});

const currencySignPos = computed(() => {
    return CurrencySettings[currentCurrency.value]["signPosition"];
});

const displayValue = computed(() => {
    return (
        (props.withSign && currencySignPos.value == "BEFORE"
            ? `${currencySign.value} `
            : "") +
        numeral(inputValue.value).format(displayFormat.value) +
        (props.withSign && currencySignPos.value == "AFTER"
            ? ` ${currencySign.value}`
            : "")
    );
});

const handleDisplayFocus = () => {
    editing.value = true;

    nextTick(() => {
        if (inputRef.value) {
            inputRef.value.focus();
            inputRef.value.select();
        }
    });
};

const handleInputBlur = () => {
    editing.value = false;
    let emitVal = rawValue.value;
    if (!props.allowNegative && rawValue.value < 0) {
        emitVal *= -1;
        inputValue.value *= -1;
        emit("update:modelValue", emitVal);
        emit("input", emitVal);
    }
};

const handleInputChange = (e) => {
    inputValue.value = e.target.value;
};

const handleKeydown = () => {
    emit("keydown");
};
</script>

<template>
    <div>
        <input
            type="text"
            :class="[
                'border border-gray-300 rounded p-2 text-right',
                { hidden: editing }
            ]"
            pattern="[0-9.!a-zA-Z0]"
            :disabled="disabled"
            :placeholder="placeholder"
            :value="displayValue"
            @focus="handleDisplayFocus"
        />
        <input
            ref="inputRef"
            type="text"
            :class="[
                'border border-red-300 rounded p-2 text-right',
                { hidden: !editing }
            ]"
            pattern="[0-9.!a-zA-Z0]"
            :placeholder="placeholder"
            :value="inputValue"
            @blur="handleInputBlur"
            @input="handleInputChange"
            @keydown="handleKeydown"
        />
    </div>
</template>

<style></style>
