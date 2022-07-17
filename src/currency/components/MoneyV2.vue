<script>
import numeral from "numeral";
import CurrencySettings from "../constants/currencySettings";

export default {
    props: {
        decimal: {
            type: Number,
            default: 2,
        },
        currency: {
            type: String,
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
    },
    computed: {
        displayValue() {
            const processedVal = numeral(this.value)
                .divide(Math.pow(10, this.decimal))
                .value();
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
            return Object.keys(CurrencySettings).includes(this.currency)
                ? this.currency
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
