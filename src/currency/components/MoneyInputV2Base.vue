<script>
import numeral from "numeral";
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
                return numeral(this.rawValue)
                    .divide(Math.pow(10, this.decimal))
                    .value();
            },
            set(value) {
                this.rawValue = Number(
                    numeral(value)
                        .multiply(Math.pow(10, this.decimal))
                        .value()
                        .toFixed(this.decimal)
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
    render: function (h) {
        const vm = this;

        const display = h("input", {
            attrs: {
                type: "text",
                class:
                    "border border-gray-300 rounded p-2 text-right mb-2" +
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
                    "border border-red-300 rounded p-2 text-right mb-2" +
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
