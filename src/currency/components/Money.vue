<script>
import Dinero from "dinero.js";
import find from "lodash/find";
import numeral from "numeral";
import Currencies, {
    DefaultCurrency,
    NoCentsCurrencies,
} from "../constants/currencies.js";

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
    computed: {
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
    },
    render(createElement) {
        const precision = this.noCentCurrency ? 0 : this.decimal;

        let currency =
            typeof this.currency === "string"
                ? find(
                      Currencies,
                      (item) =>
                          (item.country === this.currency.toUpperCase() ||
                              item.code === this.currency) &&
                          item.precision === precision,
                  )
                : this.currency;

        currency = currency ? currency : DefaultCurrency;

        //alter the value passed if it is no cent currency
        const alteredValue = this.noCentCurrency
            ? numeral(this.value).divide(Math.pow(10, this.decimal)).value()
            : this.value;

        const val = this.intValue
            ? numeral(alteredValue).value()
            : numeral(alteredValue)
                  .multiply(Math.pow(10, this.decimal))
                  .value();

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
                    .toFormat(format),
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
                    .toFormat(format),
            );
        }
    },
};
</script>
