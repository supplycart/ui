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
        type="password"
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
            regex: /^(.{8,})+/,
        };
    },
};
</script>
