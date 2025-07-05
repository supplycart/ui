<template>
    <BaseInput
        v-bind="$attrs"
        :label="label"
        :model-value="modelValue"
        :regex="regex"
        :error="error"
        :description="description"
        :required="required"
        :input-class="inputClass"
        type="email"
        @update:model-value="update"
        @blur="blur"
    />
</template>
<script>
import InputMixins from "./../mixins/input";
import BaseInput from "./BaseInput.vue";

export default {
    components: { BaseInput },
    mixins: [InputMixins],
    data() {
        return {
            regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        };
    },
};
</script>
