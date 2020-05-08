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
    type="email"
    @input="update"
    @blur="blur"
  />
</template>
<script>
    import BaseInput from "./BaseInput";
    import InputMixins from "./../mixins/input";

    export default {
        components: { BaseInput },
        mixins: [ InputMixins ],
        data() {
            return {
                regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            }
        },
    };
</script>
