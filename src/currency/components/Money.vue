<script>
import Dinero from "dinero.js";
import { find } from "lodash";
import numeral from "numeral";
import Currencies, {
    DefaultCurrency,
    NoCentsCurrencies,
} from "../constants/currencies";

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
        convertPrecision: {
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
        let precision = this.decimal;
        // to check for currencies that has no precision
        if (typeof this.currency === "string") {
            const currencyCodeCountry = [];
            NoCentsCurrencies.forEach((item) => {
                currencyCodeCountry.push(item.code);
                currencyCodeCountry.push(item.country);
            });

            if (currencyCodeCountry.includes(this.currency)) {
                precision = 0;
            }
        }
        let currency =
            typeof this.currency === "string"
                ? find(
                      Currencies,
                      (item) =>
                          (item.country === this.currency.toUpperCase() ||
                              item.code === this.currency) &&
                          item.precision === precision
                  )
                : this.currency;

        currency = currency ? currency : DefaultCurrency;

        const val = this.intValue
            ? numeral(this.value).value()
            : numeral(this.value).multiply(Math.pow(10, this.decimal)).value();

        const format = this.format
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
                })
                    .convertPrecision(this.convertPrecision, "HALF_UP")
                    .toFormat(format)
            );
        } else {
            return createElement(
                "span",
                Dinero({
                    amount: val,
                    currency: currency.code,
                    precision: currency.precision,
                })
                    .convertPrecision(this.convertPrecision, "HALF_UP")
                    .setLocale(currency.locale)
                    .toFormat(format)
            );
        }
    },
};
</script>
