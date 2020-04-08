<template>
  <FlatPickr
    :id="id"
    v-model="input"
    :config="timeConfig"
  />
</template>
<script>
  import FlatPickr from "vue-flatpickr-component";
  import { merge } from "lodash";
  import { DefaultTimeConfig } from "../constants/flatpickr";

  export default {
    name: 'TimePicker',
    components: {FlatPickr},
    props: {
      id: {
        type: String,
        default: null
      },
      value: {
        type: String,
        default: null
      },
      config: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      input: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit("input", val);
        }
      },
      timeConfig() {
        return merge(DefaultTimeConfig, this.config);
      }
    },
  };
</script>