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
            class="text-right w-full"
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

<style scoped>
input[type="text"] {
    text-align: right;
}
</style>

<script>
import Currencies, {
    DefaultCurrency,
    NoCentsCurrencies,
} from "../constants/currencies";
import FormLabel from "../../form/components/FormLabel.vue";
import { CurrencyInput } from "vue-currency-input";
import { find } from "lodash";

export default {
    name: "MoneyInput",
    components: {
        FormLabel,
        CurrencyInput,
    },
    inheritAttrs: false,
    props: {
        label: {
            type: String,
            default: null,
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
    },
    computed: {
        input: {
            get() {
                return this.parseValue(this.value);
            },
            set(value) {
                this.$emit("input", this.parseValue(value));
            },
        },
        hasError() {
            return this.errors && this.errors.length > 0;
        },
        noCentCurrency() {
            if (typeof this.currency === "string") {
                const currencyCodeCountry = [];
                NoCentsCurrencies.forEach((item) => {
                    currencyCodeCountry.push(item.code);
                    currencyCodeCountry.push(item.country);
                });

                if (currencyCodeCountry.includes(this.currency)) {
                    return true;
                }
            }
            return false;
        },
        currencyData() {
            //treat as MYR if currency passed has no cent
            const alteredCurrency = this.noCentCurrency ? "MYR" : this.currency;
            const currency =
                typeof alteredCurrency === "string"
                    ? find(
                          Currencies,
                          (item) =>
                              (item.code === alteredCurrency.toUpperCase() ||
                                  item.country ===
                                      alteredCurrency.toUpperCase()) &&
                              item.precision === this.decimal
                      )
                    : this.currency;

            return currency ? currency : DefaultCurrency;
        },
    },
    data() {
        return {
            showError: false,
        };
    },
    watch: {
        error: {
            handler(val) {
                if (val && this.required) {
                    this.showError = true;
                }
            },
        },
    },
    methods: {
        parseValue(value) {
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
        },
        blur(e) {
            if (!this.allowZero) {
                this.showError = e.target.value === 0;
            }
            if (this.required) {
                this.showError = this.value == null;
            }
            this.$emit("blur", e);
        },
    },
};
</script>