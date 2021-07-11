<template>
    <BaseInput
        v-bind="$attrs"
        :label="label"
        :value="value"
        :error="error"
        :description="description"
        :required="required"
        :input-class="inputClass"
        @input="update"
        @blur="blur"
    />
</template>
<script>
import BaseInput from "./BaseInput";
import InputMixins from "./../mixins/input";

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
        },
    },
    methods: {
        update(e) {
            this.$emit("input", e);
        },
        blur(e) {
            this.$emit("blur", e);

            if (this.maxDecimal > 0) {
                const minDecimal = this.minDecimal
                    ? this.minDecimal
                    : this.maxDecimal;
                this.$emit(
                    "input",
                    new Intl.NumberFormat("en", {
                        style: "decimal",
                        useGrouping: false,
                        minimumFractionDigits: minDecimal,
                        maximumFractionDigits: this.maxDecimal,
                    }).format(e.target.value)
                );
            }
        },
    },
};
</script>
