<script>
import numeral from "numeral";
import CurrencySettings from "../constants/currencySettings.js";
import { Decimal } from "decimal.js";

export default {
    props: {
        decimal: {
            type: Number,
            default: 2,
        },
        currency: {
            type: [String, Object],
            default: "MYR",
        },
        value: {
            type: Number,
            default: 0,
        },
        withSign: {
            type: Boolean,
            default: false,
        },
        format: {
            type: String,
            default: null,
        },
        convertPrecision: {
            type: Number,
            default: -1,
        },
    },
    computed: {
        displayValue() {
            let processedVal = numeral(this.value)
                .divide(Math.pow(10, this.decimal))
                .value();

            if (this.convertPrecision > -1) {
                // Use Decimal to avoid rounding issues caused by JS's floating-point math.
                // Some numbers (like 1.005) can't be represented exactly and may round incorrectly.
                processedVal = new Decimal(processedVal).toFixed(this.convertPrecision);
            }
            return (
                (this.withSign && this.currencySignPos == "BEFORE"
                    ? `${this.currencySign} `
                    : "") +
                numeral(processedVal).format(this.displayFormat) +
                (this.withSign && this.currencySignPos == "AFTER"
                    ? ` ${this.currencySign}`
                    : "")
            );
        },
        currentCurrency() {
            const currencyStr =
                typeof this.currency == "object"
                    ? this.currency.code
                    : this.currency;
            return Object.keys(CurrencySettings).includes(currencyStr)
                ? currencyStr
                : "MYR";
        },
        currencySign() {
            return CurrencySettings[this.currentCurrency]["sign"];
        },
        currencySignPos() {
            return CurrencySettings[this.currentCurrency]["signPosition"];
        },
        displayFormat() {
            return this.format
                ? this.format
                : CurrencySettings[this.currentCurrency]["displayFormat"];
        },
    },
    render(createElement) {
        return createElement("span", this.displayValue);
    },
};
</script>

<style></style>
