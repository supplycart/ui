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
            class="text-right"
            :class="inputClass"
            v-model="input"
            :locale="currencyData.locale"
            :currency="showCurrency ? {currency: currencyData.code, prefix: currencyData.sign} : null"
            :precision="currencyData.precision"/>

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
    import Currencies from "../constants/currencies";
    import { DefaultCurrency } from "../constants/currencies";
    import { CurrencyInput } from "vue-currency-input";

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
                type: Number | String,
                default: 0
            },
            required: {
                type: Boolean,
                default: false
            },
            currency: {
                type: String | Object,
                default: null
            },
            inputClass: {
                type: String | Object,
                default: null
            },
            errors: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            input: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit("input", value);
                }
            },
            hasError() {
                return this.errors && this.errors.length > 0;
            },
            currencyData() {
                let currency = this.currency instanceof String ? Currencies.find(item => item.code === this.currency || item.country === this.currency.toUpperCase()) : this.currency;

                return currency ? currency : DefaultCurrency;
            },
            showCurrency() {
                return !!this.currency;
            }
        }
    };
</script>
