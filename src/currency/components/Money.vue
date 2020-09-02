<script>
    import Dinero from "dinero.js";
    import Currencies from "../constants/currencies";
    import { DefaultCurrency } from "../constants/currencies";
    import { find, replace } from "lodash";
    import numeral from "numeral";

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
            },
            intValue: {
                type: Boolean,
                default: true
            }
        },
        render(createElement, context) {
            let currency = typeof this.currency === "string"
                ? find(Currencies, item => item.country === this.currency.toUpperCase() || item.code === this.currency)
                : this.currency;

            currency = currency ? currency : DefaultCurrency;

            let val = this.intValue ? numeral(this.value).value() : numeral(this.value).multiply(100).value();

            let format = this.format ? this.format : this.sign ? currency.formatWithSign : currency.format;

            // EUR and GBP are the currencies that is being used by many countries
            if(currency.code === "EUR" || currency.code === "GBP") { 
                return createElement("span", Dinero({
                    amount: val,
                    currency: currency.code,
                    precision: currency.precision
                }).toFormat(format));
            } else {
                return createElement("span", Dinero({
                    amount: val,
                    currency: currency.code,
                    precision: currency.precision
                }).setLocale(currency.locale).toFormat(format));
            }

        }
    };
</script>
