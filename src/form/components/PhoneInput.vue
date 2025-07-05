<template>
    <BaseInput
        v-bind="$attrs"
        :label="label"
        :model-value="modelValue"
        :regex="regex"
        :error="error"
        :input-class="inputClass"
        :description="description"
        :required="required"
        @update:model-value="update"
        @blur="blur"
    />
</template>
<script>
import InputMixins from "../mixins/input";
import BaseInput from "./BaseInput.vue";

export default {
    components: { BaseInput },
    mixins: [InputMixins],
    data() {
        return {
            regex: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-]?[\s./0-9]*[x]?[\s./0-9]*$/,
        };
    },
    methods: {
        update(e) {
            const val = e.replace(/[^0-9+-\sx]/g, "");
            this.$emit("update:modelValue", val);
        },
    },
};
</script>
