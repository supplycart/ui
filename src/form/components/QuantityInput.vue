<template>
    <BaseInput
        v-if="onFocus"
        v-bind="$attrs"
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
import BaseInput from "./BaseInput";
import InputMixins from "./../mixins/input";
import numeral from "numeral";

export default {
    components: { BaseInput },
    mixins: [InputMixins],
    props: {
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
            return emitValue;
        },
        blur(e) {
            this.$emit("blur", e);
            this.onFocus = false;
        },
    },
};
</script>
