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
      :currency="sign ? {currency: currencyData.code, prefix: currencyData.sign} : null"
      :precision="currencyData.precision"
      :value-as-integer="intValue"
      :allow-negative="allowNegative"
      @blur="blur"
    />

    <slot name="error" >
        <p
            v-if="showError"
            class="italic text-red-600 text-xs mt-2"
        >
            {{ error }}
        </p>
    </slot>
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
            error: {
                type: String,
                default: null
            },
            intValue: {
                type: Boolean,
                default: true
            },
            allowNegative: {
                type: Boolean,
                default: false
            },
            allowZero: {
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
        },
        data() {
            return {
                showError: false
            };
        },
        watch: {
            error: {
                handler(val) {
                    if(val && this.required) {
                        this.showError = true
                    }
                },
            }
        },
        methods: {
            blur(e) {
                if(!this.allowZero){
                    this.showError = e.target.value!=0 ? false : true;
                }
                this.$emit('blur', e);
            },
        }
    };
</script>
