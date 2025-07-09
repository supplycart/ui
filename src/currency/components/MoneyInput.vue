<template>
    <div>
        <slot name="label">
            <FormLabel
                :id="$attrs.id"
                :label="label"
                :required="required"
                :disabled="disabled"
            />
        </slot>

        <input
            v-if="currencyData"
            ref="inputRef"
            v-bind="$attrs"
            type="text"
            class="text-right w-full"
            :class="[showError ? 'input-error' : '', inputClass]"
            :disabled="disabled"
            :required="required"
            @blur="blur"
        />

        <slot name="error">
            <p v-if="showError" class="italic text-red-600 text-xs mt-2">
                {{ error }}
            </p>
        </slot>
        <slot name="description" />
    </div>
</template>
<style scoped>
input[type="text"] {
    text-align: right;
}
</style>
<script setup>
import { ref, computed, watch } from "vue"
import "vue-currency-input/dist/style.css";
import { useCurrencyInput } from "vue-currency-input"
import { find } from "lodash-es"
import FormLabel from "../../form/components/FormLabel.vue"
import Currencies, {
    DefaultCurrency,
    NoCentsCurrencies,
} from "../constants/currencies.js"

// Define props
// Note: 'value' prop is kept for backward compatibility
const props = defineProps({
    label: {
        type: String,
        default: null,
    },
    modelValue: {
        type: [Number, String],
        default: 0,
    },
    value: {
        type: [Number, String],
        default: 0,
    },
    required: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
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
    inputClass: {
        type: [String, Object],
        default: null,
    },
    error: {
        type: String,
        default: "Please fill out this field.",
    },
    intValue: {
        type: Boolean,
        default: true,
    },
    allowNegative: {
        type: Boolean,
        default: false,
    },
    allowZero: {
        type: Boolean,
        default: true,
    },
})

// Define emits
const emit = defineEmits(["update:modelValue", "input", "blur"])

// Reactive state and logic
const showError = ref(false)

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

        const currencyData = computed(() => {
            //treat as MYR if currency passed has no cent
            const alteredCurrency = noCentCurrency.value
                ? "MYR"
                : props.currency;
            const currency =
                typeof alteredCurrency === "string"
                    ? find(
                          Currencies,
                          (item) =>
                              (item.code === alteredCurrency.toUpperCase() ||
                                  item.country ===
                                      alteredCurrency.toUpperCase()) &&
                              item.precision === props.decimal,
                      )
                    : props.currency;

            return currency ? currency : DefaultCurrency;
        });

        const currencyOptions = computed(() => ({
            currency: currencyData.value.code,
            locale: currencyData.value.locale,
            precision: currencyData.value.precision,
            hideCurrencySymbolOnFocus: true,
            hideGroupingSeparatorOnFocus: true,
            allowNegative: props.allowNegative,
            valueAsInteger: props.intValue,
            currencyDisplay: props.sign ? "symbol" : "code",
        }));

        const { inputRef, numberValue } = useCurrencyInput(
            currencyOptions.value,
            false,
        );

        // Watch for value changes and emit
        watch(numberValue, (newValue) => {
            if (newValue !== undefined) {
                emit("update:modelValue", newValue);
                emit("input", newValue); // Keep backward compatibility
            }
        });

        // Watch for external value changes
        watch(
            () =>
                props.modelValue !== undefined ? props.modelValue : props.value,
            (newValue) => {
                if (newValue !== numberValue.value) {
                    numberValue.value = newValue;
                }
            },
            { immediate: true },
        );

        // Watch for error changes
        watch(
            () => props.error,
            (val) => {
                if (val && props.required) {
                    showError.value = true;
                }
            },
        );

        const blur = (e) => {
            const currentValue =
                props.modelValue !== undefined ? props.modelValue : props.value;
            if (!props.allowZero) {
                showError.value = e.target.value === 0;
            }
            if (props.required) {
                showError.value = currentValue == null;
            }
            emit("blur", e);
        };

// Define options
defineOptions({
    name: "MoneyInput",
    inheritAttrs: false
})
</script>
