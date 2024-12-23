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

        <CurrencyInput
            v-if="currencyData"
            v-model="input"
            v-bind="$attrs"
            class="text-right text-right w-full"
            :class="[showError ? 'input-error' : '', inputClass]"
            :disabled="disabled"
            :required="required"
            :locale="currencyData.locale"
            :currency="
                sign
                    ? { currency: currencyData.code, prefix: currencyData.sign }
                    : null
            "
            :precision="currencyData.precision"
            :value-as-integer="intValue"
            :allow-negative="allowNegative"
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

<script setup>
import { computed, ref, watch, defineProps } from "vue";
import find from "lodash-es/find";
import Currencies, {
    DefaultCurrency,
    NoCentsCurrencies,
} from "../constants/currencies";
import FormLabel from "../../form/components/FormLabel.vue";
import { CurrencyInput } from "vue-currency-input";

const props = defineProps({
    label: {
        type: String,
        default: null,
    },
    modelValue: {
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
});

const emit = defineEmits(["update:modelValue", "blur"]);

const showError = ref(false);

const input = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});

const noCentCurrency = computed(() => {
    if (typeof props.currency === "string") {
        const currencyCodeCountry = NoCentsCurrencies.flatMap((item) => [
            item.code,
            item.country,
        ]);
        return currencyCodeCountry.includes(props.currency);
    }
    return false;
});

const currencyData = computed(() => {
    const alteredCurrency = noCentCurrency.value ? "MYR" : props.currency;
    const currency =
        typeof alteredCurrency === "string"
            ? find(
                  Currencies,
                  (item) =>
                      (item.code === alteredCurrency.toUpperCase() ||
                          item.country === alteredCurrency.toUpperCase()) &&
                      item.precision === props.decimal
              )
            : props.currency;

    return currency || DefaultCurrency;
});

watch(
    () => props.error,
    (val) => {
        if (val && props.required) {
            showError.value = true;
        }
    }
);

const blur = (e) => {
    if (!props.allowZero) {
        showError.value = e.target.value === 0;
    }
    if (props.required) {
        showError.value = props.modelValue == null;
    }
    emit("blur", e);
};
</script>

<style scoped>
input[type="text"] {
    text-align: right;
}
</style>
