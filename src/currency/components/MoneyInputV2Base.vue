<script>
import numeral from "numeral";
import { h } from "vue";
import CurrencySettings from "../constants/currencySettings.js";

export default {
    emits: ["update:modelValue", "input", "keydown"],
    props: {
        decimal: {
            type: Number,
            default: 2,
        },
        currency: {
            type: [String, Object],
            default: "MYR",
        },
        modelValue: {
            type: Number,
            default: 0,
        },
        // Keep value for backward compatibility
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
                // Use modelValue if provided, otherwise fall back to value for backward compatibility
                const currentValue =
                    this.modelValue !== undefined
                        ? this.modelValue
                        : this.value;
                return currentValue ?? 0;
            },
            set(val) {
                this.$emit("update:modelValue", val);
                // Keep backward compatibility with input event
                this.$emit("input", val);
            },
        },
        inputValue: {
            get() {
                return numeral(this.rawValue)
                    .divide(Math.pow(10, this.decimal))
                    .value();
            },
            set(value) {
                this.rawValue = Number(
                    numeral(value)
                        .multiply(Math.pow(10, this.decimal))
                        .value()
                        .toFixed(this.decimal),
                );
            },
        },
        displayValue: {
            get() {
                return (
                    (this.withSign && this.currencySignPos == "BEFORE"
                        ? `${this.currencySign} `
                        : "") +
                    numeral(this.inputValue).format(this.displayFormat) +
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
    render() {
        const vm = this;

        const display = h("input", {
            type: "text",
            class:
                "border border-gray-300 rounded p-2 text-right" +
                (vm.editing ? " hidden" : ""),
            pattern: "[0-9.!a-zA-Z0]",
            disabled: vm.disabled,
            placeholder: vm.placeholder,
            value: vm.displayValue,
            onFocus: function (e) {
                vm.editing = true;

                vm.$nextTick(function () {
                    const inputEl = vm.$refs.inputRef;
                    if (inputEl) {
                        inputEl.focus();
                        inputEl.select();
                    }
                });
            },
        });

        const input = h("input", {
            ref: 'inputRef',
            type: "text",
            class:
                "border border-red-300 rounded p-2 text-right" +
                (!vm.editing ? " hidden" : ""),
            pattern: "[0-9.!a-zA-Z0]",
            placeholder: vm.placeholder,
            value: vm.inputValue,
            onBlur: function (e) {
                vm.editing = false;
                let emitVal = vm.rawValue;
                if (!vm.allowNegative && vm.rawValue < 0) {
                    emitVal *= -1;
                    vm.inputValue *= -1;
                    vm.$emit("update:modelValue", emitVal);
                    vm.$emit("input", emitVal);
                }
            },
            onInput: function (e) {
                const oldValue = vm.inputValue;
                vm.inputValue = e.target.value;
            },
            onKeydown: function (e) {
                vm.$emit("keydown");
            },
        });

        return h("div", [display, input]);
    },
};
</script>

<style></style>
