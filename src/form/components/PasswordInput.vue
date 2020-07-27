<template>
    <BaseInput
        v-bind="$attrs"
        :label="label"
        :value="value"
        :regex="regex"
        :error="error"
        :input-class="inputClass"
        :description="description"
        :required="required"
        type="password"
        @input="update"
        @blur="blur"/>
</template>
<script>
    import InputMixins from "../mixins/input";
    import BaseInput from "../components/BaseInput";

    export default {
        components: { BaseInput },
        mixins: [ InputMixins ],
        data() {
            return {
                regex:  /^(.{8,})+/,
            }
        }
    };
</script>
