<template>
    <BaseInput
        v-if="onFocus"
        v-bind="$attrs"
        type="number"
        :max="maximumValue"
        :label="label"
        v-model="input"
        :error="error"
        :description="description"
        :required="required"
        :input-class="inputClass"
        @input="update"
        @blur="blur"
    />
    <BaseInput
        v-else
        v-bind="$attrs"
        type="text"
        :label="label"
        :value="formattedInput"
        :error="error"
        :description="description"
        :required="required"
        :input-class="inputClass"
        @focus="onFocus = true"
    />
</template>
<script>
import BaseInput from "./BaseInput.vue";
import InputMixins from "./../mixins/input";
import numeral from "numeral";

export default {
    components: { BaseInput },
    mixins: [InputMixins],
    props: {
        maximumValue: {
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
        maximumValue: {
            type: Number,
            default: null,
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
        };
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

            if (this.maximumValue !== null && emitValue > this.maximumValue) {
                emitValue = this.maximumValue;
            }
            return emitValue;
        },
        blur(e) {
            this.$emit("blur", e);
            this.onFocus = false;
        },
    },
};
</script>
