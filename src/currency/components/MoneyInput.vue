<template>
    <div>
        <slot name="label">
            <label
                v-if="label"
                :for="$attrs.id">
                {{ label }}
                <small
                    v-if="required"
                    class="italic text-red-600">*
                </small>
            </label>
        </slot>

        <CurrencyInput
            v-if="currencyData"
            class="text-right text-right w-full"
            :class="inputClass"
            v-model="input"
            :locale="currencyData.locale"
            :currency="sign ? {currency: currencyData.code, prefix: currencyData.sign} : null"
            :precision="currencyData.precision"
            :value-as-integer="intValue"
        />

        <slot name="error"></slot>
        <slot name="description"></slot>
    </div>
</template>
<style scoped>
    input[type=text] {
        text-align: right;
    }
</style>
<script>

    import Currencies, { DefaultCurrency } from "../constants/currencies";
    import { CurrencyInput } from "vue-currency-input";
    import { find } from "lodash";
    import numeral from "numeral";

    export default {
        name: "MoneyInput",
        inheritAttrs: false,
        components: {
            CurrencyInput
        },
        props: {
            label: {
                type: String,
                default: null
            },
            value: {
                type: [Number, String],
                default: 0
            },
            required: {
                type: Boolean,
                default: false
            },
            currency: {
                type: [String, Object],
                default: null
            },
            sign: {
                type: Boolean,
                default: false
            },
            inputClass: {
                type: [String, Object],
                default: null
            },
            errors: {
                type: Array,
                default: () => []
            },
            intValue: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            input: {
                get() {
                    return numeral(this.value).value();
                },
                set(value) {
                    this.$emit("input", numeral(value).value());
                }
            },
            hasError() {
                return this.errors && this.errors.length > 0;
            },
            currencyData() {
                let currency = typeof this.currency === "string" ? find(Currencies, item => item.code === this.currency.toUpperCase() || item.country === this.currency.toUpperCase()) : this.currency;

                return currency ? currency : DefaultCurrency;
            }
        }
    };
</script>
