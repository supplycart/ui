<template>
    <BaseInput
        v-bind="$attrs"
        :label="label"
        :value="value"
        :regex="newRegex"
        :error="error"
        :description="description"
        :required="required"
        :input-class="inputClass"
        type="number"
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
        decimal: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        newRegex() {
            const firstExp = "^\\d*(\\.\\d{0,";
            const lastExp = "})?$";
            return new RegExp(firstExp + this.decimal + lastExp);
        },
    },
    methods: {
        update(e) {
            this.$emit("input", e);
        },
    },
};
</script>
