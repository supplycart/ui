<script>
import Dinero from "dinero.js";
import { find } from "lodash";
import Currencies, {
    DefaultCurrency,
    NoCentsCurrencies,
} from "../constants/currencies";
import { format as formatMoney } from "../index";

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
    methods: {
        parseValue(value) {
            // Convert string to number if needed
            return typeof value === 'string' ? parseFloat(value) : value;
        },
        roundToDecimal(value, decimals) {
            const multiplier = Math.pow(10, decimals);
            return Math.round(value * multiplier) / multiplier;
        }
    },
    render(createElement) {
        const precision = this.noCentCurrency ? 0 : this.decimal;

    let currency =
        typeof props.currency === "string"
            ? find(
                  Currencies,
                  (item) =>
                      (item.country === props.currency.toUpperCase() ||
                          item.code === props.currency) &&
                      item.precision === precision
              )
            : props.currency;

    currency = currency || DefaultCurrency;

        // Parse and handle the value
        let parsedValue = this.parseValue(this.value);

        // Handle no cents currency
        const alteredValue = this.noCentCurrency
            ? parsedValue / Math.pow(10, this.decimal)
            : parsedValue;

        // Handle integer value conversion
        const val = this.intValue
            ? Math.floor(alteredValue)
            : Math.round(alteredValue * Math.pow(10, this.decimal));

        const format = this.format
            ? this.format
            : this.sign
            ? currency.formatWithSign
            : currency.format;

        // EUR and GBP special handling
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