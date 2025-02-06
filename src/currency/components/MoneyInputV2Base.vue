<script>
import { h } from "vue";
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
        disabled: {
            type: Boolean,
            default: false,
        },
        format: {
            type: String,
            default: null,
        },
        allowNegative: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            editing: false,
        };
    },
    computed: {
        rawValue: {
            get() {
                return this.value ?? 0;
            },
            set(val) {
                this.$emit("input", val);
            },
        },
        inputValue: {
            get() {
                return this.rawValue / Math.pow(10, this.decimal);
            },
            set(value) {
                const parsedValue = this.parseValue(value);
                this.rawValue = Number(
                    (parsedValue * Math.pow(10, this.decimal)).toFixed(this.decimal)
                );
            },
        },
        displayValue: {
            get() {
                const formattedValue = this.formatNumber(
                    this.inputValue,
                    this.displayFormat
                );
                return (
                    (this.withSign && this.currencySignPos == "BEFORE"
                        ? `${this.currencySign} `
                        : "") +
                    formattedValue +
                    (this.withSign && this.currencySignPos == "AFTER"
                        ? ` ${this.currencySign}`
                        : "")
                );
            },
            set(val) {},
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
        displayFormat() {
            return this.format
                ? this.format
                : CurrencySettings[this.currentCurrency]["displayFormat"];
        },
        inputFormat() {
            return CurrencySettings[this.currentCurrency]["inputFormat"];
        },
        currencySign() {
            return CurrencySettings[this.currentCurrency]["sign"];
        },
        currencySignPos() {
            return CurrencySettings[this.currentCurrency]["signPosition"];
        },
    },
    methods: {
        parseValue(value) {
            if (value === null || value === undefined || value === '') {
                return 0;
            }
            // Handle string values
            if (typeof value === 'string') {
                // Remove any non-numeric characters except decimal point and minus
                value = value.replace(/[^\d.-]/g, '');
                return parseFloat(value) || 0;
            }
            // Handle number values
            return typeof value === 'number' ? value : 0;
        },
        formatNumber(number, format) {
            // Handle the formatting based on the format string
            // Example format: "0,0.00"
            const num = parseFloat(number);
            if (isNaN(num)) return '0';

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
    render() {
        const vm = this;

        const display = h("input", {
            attrs: {
                type: "text",
                class:
                    "border border-gray-300 rounded p-2 text-right" +
                    (vm.editing ? " hidden" : ""),
                pattern: "[0-9.!a-zA-Z0]",
                disabled: vm.disabled,
                placeholder: vm.placeholder,
            },
            domProps: {
                value: vm.displayValue,
            },
            on: {
                focus: function (e) {
                    vm.editing = true;

                    vm.$nextTick(function () {
                        input.elm.focus();
                        input.elm.select();
                    });
                },
            },
        });

        const input = h("input", {
            attrs: {
                type: "text",
                class:
                    "border border-red-300 rounded p-2 text-right" +
                    (!vm.editing ? " hidden" : ""),
                pattern: "[0-9.!a-zA-Z0]",
                placeholder: vm.placeholder,
            },
            domProps: {
                value: vm.inputValue,
            },
            on: {
                blur: function (e) {
                    vm.editing = false;
                    let emitVal = vm.rawValue;
                    if (!vm.allowNegative && vm.rawValue < 0) {
                        emitVal *= -1;
                        vm.inputValue *= -1;
                        vm.$emit("input", emitVal);
                    }
                },
                input: function (e) {
                    const oldValue = vm.inputValue;
                    vm.inputValue = e.target.value;
                },
                keydown: function (e) {
                    vm.$emit("keydown");
                },
            },
        });

        return h("div", [display, input]);
    },
};
</script>

<style></style>