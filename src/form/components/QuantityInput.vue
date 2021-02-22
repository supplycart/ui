<template>
    <BaseInput
        v-bind="$attrs"
        :label="label"
        :value="value"
        :regex="regex"
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
    data() {
        return {
            regex: /^[0-9]{1,6}$/,
        };
    },
    methods: {
        update(e) {
            let val = e.replace(/\D+/g, "");
            this.$emit("input", val);
        },
    },
};
</script>
