<template>
    <BaseInput
        v-bind="$attrs"
        :label="label"
        :value="value"
        :error="error"
        :required="required"
        :description="description"
        @input="update"
        @blur="blur"/>
</template>
<script>
    import BaseInput from "./BaseInput";
    import InputMixins from "./../mixins/input";

    export default {
        components: { BaseInput },
        mixins: [ InputMixins ],
    };
</script>