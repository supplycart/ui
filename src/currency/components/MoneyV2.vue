<script>
import Decimal from "decimal.js";
import CurrencySettings from "../constants/currencySettings";

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
    methods: {
        formatNumber(value, format) {
            try {
                const decimal = new Decimal(value);
                
                // Parse format string (e.g., "0,0.00")
                const parts = format.split('.');
                const hasDecimals = parts.length > 1;
                const decimalPlaces = hasDecimals ? parts[1].length : 0;

                // Get the absolute value for formatting
                const absValue = decimal.abs();
                
                // Format with proper decimal places
                const formatted = absValue.toFixed(decimalPlaces);
                const [intPart, decPart] = formatted.split('.');

                // Add thousand separators
                const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                // Combine the parts
                const result = hasDecimals && decPart 
                    ? `${withCommas}.${decPart}`
                    : withCommas;

                // Handle negative numbers
                return decimal.isNegative() ? `-${result}` : result;
            } catch (e) {
                return '0';
            }
        }
    },
    computed: {
        displayValue() {
            try {
                const value = new Decimal(this.value || 0);
                const powerTen = new Decimal(10).pow(this.decimal);
                let processedVal = value.dividedBy(powerTen);

                if (this.convertPrecision > -1) {
                    processedVal = new Decimal(processedVal.toFixed(this.convertPrecision));
                }

                const formattedNumber = this.formatNumber(processedVal, this.displayFormat);
                
                return (
                    (this.withSign && this.currencySignPos == "BEFORE"
                        ? `${this.currencySign} `
                        : "") +
                    formattedNumber +
                    (this.withSign && this.currencySignPos == "AFTER"
                        ? ` ${this.currencySign}`
                        : "")
                );
            } catch (e) {
                return '0';
            }
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