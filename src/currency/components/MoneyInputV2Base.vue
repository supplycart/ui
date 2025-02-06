<script>
import { h } from "vue";
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
                try {
                    return new Decimal(this.value ?? 0);
                } catch (e) {
                    return new Decimal(0);
                }
            },
            set(val) {
                try {
                    const decimal = new Decimal(val);
                    this.$emit("input", decimal.toNumber());
                } catch (e) {
                    this.$emit("input", 0);
                }
            },
        },
        inputValue: {
            get() {
                const powerTen = new Decimal(10).pow(this.decimal);
                return this.rawValue.dividedBy(powerTen).toString();
            },
            set(value) {
                try {
                    const decimal = new Decimal(value || 0);
                    const powerTen = new Decimal(10).pow(this.decimal);
                    const result = decimal.times(powerTen).toFixed(this.decimal);
                    this.rawValue = new Decimal(result);
                } catch (e) {
                    this.rawValue = new Decimal(0);
                }
            },
        },
        displayValue: {
            get() {
                try {
                    const formatted = this.formatNumber(this.inputValue, this.displayFormat);
                    return (
                        (this.withSign && this.currencySignPos == "BEFORE"
                            ? `${this.currencySign} `
                            : "") +
                        formatted +
                        (this.withSign && this.currencySignPos == "AFTER"
                            ? ` ${this.currencySign}`
                            : "")
                    );
                } catch (e) {
                    return "0";
                }
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
                    if (!vm.allowNegative && vm.rawValue.isNegative()) {
                        emitVal = emitVal.negated();
                        vm.inputValue = vm.rawValue.negated().toString();
                        vm.$emit("input", emitVal.toNumber());
                    }
                },
                input: function (e) {
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