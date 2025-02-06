<script>
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
        formatNumber(number, format) {
            // Handle null/undefined
            if (number === null || number === undefined) {
                return '0';
            }

            const num = parseFloat(number);
            if (isNaN(num)) return '0';

            // Parse format string (e.g., "0,0.00")
            const parts = format.split('.');
            const hasDecimals = parts.length > 1;
            const decimalPlaces = hasDecimals ? parts[1].length : 0;

            // Format the number with the specified decimal places
            const formatted = Math.abs(num).toFixed(decimalPlaces);
            const [intPart, decPart] = formatted.split('.');

            // Add thousand separators
            const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

            // Combine the parts
            const result = hasDecimals ? `${withCommas}.${decPart}` : withCommas;

            // Handle negative numbers
            return num < 0 ? `-${result}` : result;
        }
    },
    computed: {
        displayValue() {
            let processedVal = this.value / Math.pow(10, this.decimal);

            if (this.convertPrecision > -1) {
                processedVal = Number(processedVal.toFixed(this.convertPrecision));
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