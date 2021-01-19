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
      :class="inputClass"
      :disabled="disabled"
      :required="required"
      :locale="currencyData.locale"
      :currency="sign ? {currency: currencyData.code, prefix: currencyData.sign} : null"
      :precision="currencyData.precision"
      :value-as-integer="intValue"
      :allow-negative="allowNegative"
      @blur="blur"
    />

    <slot name="error" />
    <slot name="description" />
  </div>
</template>
<style scoped>
    input[type=text] {
        text-align: right;
    }
</style>
<script>

    import Currencies, { DefaultCurrency } from "../constants/currencies";
    import FormLabel from "../../form/components/FormLabel";
    import { CurrencyInput } from "vue-currency-input";
    import { find } from "lodash";
    import numeral from "numeral";

    export default {
        name: "MoneyInput",
        components: {
            FormLabel,
            CurrencyInput
        },
        inheritAttrs: false,
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
            disabled: {
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
            },
            allowNegative: {
                type: Boolean,
                default: false
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
        },
        methods: {
            blur(e) {
                this.$emit('blur', e);
            },
        }
    };
</script>
