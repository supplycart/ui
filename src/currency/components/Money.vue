<script>
    import Dinero from "dinero.js";
    import Currencies from "../constants/currencies";
    import { DefaultCurrency } from "../constants/currencies";
    import { find, replace } from "lodash";

    export default {
        name: "Money",
        props: {
            value: {
                type: [String, Number],
                default: () => ("0.00")
            },
            currency: {
                type: [String, Object],
                default: null
            },
            sign: {
                type: Boolean,
                default: false
            },
            format: {
                type: String,
                default: null
            }
        },
        render(createElement, context) {
            let currency = typeof this.currency === "string"
                ? find(Currencies, item => item.country === this.currency.toUpperCase() || item.code === this.currency)
                : this.currency;

            currency = currency ? currency : DefaultCurrency;

            let strVal = typeof this.value === "number" ? this.value.toFixed(currency.precision) : this.value;

            let format = this.format ? this.format : this.sign ? currency.formatWithSign : currency.format;

            return createElement("span", Dinero({
                amount: parseInt(replace(strVal, ".", "")),
                currency: currency.code,
                precision: currency.precision
            }).setLocale(currency.locale).toFormat(format));
        }
    };
</script>
