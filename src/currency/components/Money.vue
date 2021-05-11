<script>
import Dinero from "dinero.js";
import { find } from "lodash";
import numeral from "numeral";
import Currencies, { DefaultCurrency } from "../constants/currencies";

export default {
    name: "Money",
    props: {
        value: {
            type: [String, Number],
            default: () => "0.00",
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
        format: {
            type: String,
            default: null,
        },
        intValue: {
            type: Boolean,
            default: true,
        },
    },
    render(createElement) {
        let currency =
            typeof this.currency === "string"
                ? find(
                      Currencies,
                      (item) =>
                          (item.country === this.currency.toUpperCase() ||
                              item.code === this.currency) &&
                          item.precision === this.decimal
                  )
                : this.currency;

        currency = currency ? currency : DefaultCurrency;

        let val = this.intValue
            ? numeral(this.value).value()
            : numeral(this.value).multiply(Math.pow(10, this.decimal)).value();

        let format = this.format
            ? this.format
            : this.sign
            ? currency.formatWithSign
            : currency.format;

        // EUR and GBP are the currencies that is being used by many countries
        if (currency.code === "EUR" || currency.code === "GBP") {
            return createElement(
                "span",
                Dinero({
                    amount: val,
                    currency: currency.code,
                    precision: currency.precision,
                }).toFormat(format)
            );
        } else {
            return createElement(
                "span",
                Dinero({
                    amount: val,
                    currency: currency.code,
                    precision: currency.precision,
                })
                    .setLocale(currency.locale)
                    .toFormat(format)
            );
        }
    },
};
</script>
