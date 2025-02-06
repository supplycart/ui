<script>
import Dinero from "dinero.js";
import find from "lodash/find";
import Decimal from "decimal.js";
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
            try {
                return new Decimal(value || 0);
            } catch (e) {
                return new Decimal(0);
            }
        },
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

        // Create Decimal instances for precise calculations
        const value = this.parseValue(this.value);
        const powerTen = new Decimal(10).pow(this.decimal);

        // Handle no cent currency
        const alteredValue = this.noCentCurrency
            ? value.dividedBy(powerTen)
            : value;

        // Calculate final value with proper precision
        const val = this.intValue
            ? alteredValue.floor()
            : alteredValue.times(powerTen).round();

        const format = this.format
            ? this.format
            : this.sign
            ? currency.formatWithSign
            : currency.format;

        // Convert Decimal to number for Dinero
        const amount = parseInt(val.toString());

        // EUR and GBP are the currencies that is being used by many countries
        if (currency.code === "EUR" || currency.code === "GBP") {
            return createElement(
                "span",
                Dinero({
                    amount: amount,
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
                    amount: amount,
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