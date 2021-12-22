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
    },
    data() {
        return {
            editing: false,
        };
    },
    computed: {
        rawValue: {
            get() {
                return this.value;
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
        displayFormat() {
            return this.format
                ? this.format
                : CurrencySettings[this.currency]["displayFormat"];
        },
        inputFormat() {
            return CurrencySettings[this.currency]["inputFormat"];
        },
        currencySign() {
            return CurrencySettings[this.currency]["sign"];
        },
        currencySignPos() {
            return CurrencySettings[this.currency]["signPosition"];
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
                    }
                    vm.$emit("input", emitVal);
                },
                input: function (e) {
                    const oldValue = vm.inputValue;
                    vm.inputValue = e.target.value;
                },
            },
        });

        return h("div", [display, input]);
    },
};
</script>

<style></style>
