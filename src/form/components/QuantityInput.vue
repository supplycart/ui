<template>
    <BaseInput
        v-if="onFocus"
        v-bind="$attrs"
        type="number"
        :max="maximumValue"
        :min="minimumValue"
        :label="label"
        v-model="input"
        :error="error || showMaxValueError || showMinValueError"
        :description="description"
        :required="required"
        :input-class="inputClass"
        @input="update"
        @blur="blur"
        @keydown="keydown"
    />
    <BaseInput
        v-else
        v-bind="$attrs"
        type="text"
        :label="label"
        :value="formattedInput"
        :error="error || showMaxValueError || showMinValueError"
        :description="description"
        :required="required"
        :input-class="inputClass"
        @focus="
            onFocus = true;
            focus();
        "
    />
</template>
<script>
import BaseInput from "./BaseInput.vue";
import InputMixins from "./../mixins/input.js";
import numeral from "numeral";

export default {
    components: { BaseInput },
    mixins: [InputMixins],
    props: {
        maximumValue: {
            type: Number,
            default: null,
        },
        minimumValue: {
            type: Number,
            default: null,
        },
        maxDecimal: {
            type: Number,
            default: 0,
        },
        minDecimal: {
            type: Number,
            default: 0,
        },
        allowNegative: {
            type: Boolean,
            default: true,
        },
        nullable: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        input: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", this.getEmitValue(value));
            },
        },
        formattedInput() {
            if (this.nullable && (this.input == "" || this.input == null)) {
                return null;
            }
            return numeral(this.input).format(this.numeralFormat);
        },
        numeralFormat() {
            let format = "0,0";
            if (this.minDecimal > 0) {
                format += ".";
                let i = 0;
                while (i < this.minDecimal) {
                    format += "0";
                    i++;
                }
                // in case no maxDecimal prop passed
                if (this.maxDecimal > this.minDecimal) {
                    const remainingDP = this.maxDecimal - this.minDecimal;
                    let appendOptionalDP = "";
                    let i = 0;
                    while (i < remainingDP) {
                        appendOptionalDP += "0";
                        i++;
                    }
                    format = `${format}[${appendOptionalDP}]`;
                }
            }
            return format;
        },
    },
    data() {
        return {
            onFocus: false,
            maxValueErrorMessage: `Maximum number allowed is ${this.maximumValue}`,
            minValueErrorMessage: `Minimum number allowed is ${this.minimumValue}`,
            showMaxValueError: null,
            showMinValueError: null,
        };
    },
    created() {
        if (this.maximumValue != null && this.input > this.maximumValue) {
            this.update(this.maximumValue);
        }
    },
    methods: {
        update(e) {
            this.$emit("input", this.getEmitValue(e));
        },
        getEmitValue(value) {
            let emitValue = value;
            if (!this.allowNegative && value < 0) {
                emitValue = Number(value) * -1;
            }

            if (this.maximumValue != null && emitValue > this.maximumValue) {
                this.showMaxValueError = this.maxValueErrorMessage;
                emitValue = this.maximumValue;
                this.$emit("error", this.maxValueErrorMessage);
            } else {
                this.showMaxValueError = null;
            }

            if (this.minimumValue != null && emitValue < this.minimumValue) {
                this.showMinValueError = this.minValueErrorMessage;
                this.$emit("error", this.minValueErrorMessage);
            } else {
                this.showMinValueError = null;
            }

            return emitValue;
        },
        blur(e) {
            this.$emit("blur", e);
            this.onFocus = false;
        },
        focus() {
            this.$nextTick(function () {
                const input = this.$el.querySelector("input");
                input.focus();
                input.select();
            });
        },
        keydown() {
            this.$emit("keydown");
        },
    },
};
</script>
