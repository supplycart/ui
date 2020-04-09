<template>
  <BaseAttachment 
    v-model="input"
    @change="change"
  >
    <label
      slot-scope="{ setAttachment }"
      class="cursor-pointer inline-block"
      :for="id"
    >
      <input
        :id="id"
        type="file"
        class="hidden"
        @change="setAttachment"
      >
      <slot>
        <div>{{ label }}</div>
      </slot>
    </label>
  </BaseAttachment>
</template>
<script>
import BaseAttachment from "./BaseAttachment";

export default {
  components: {
    BaseAttachment
  },
  props: {
    id: {
      type: String,
      default: 'button-attachment'
    },
    value: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: 'Upload'
    }
  },
  computed: {
    input: {
      set(val) {
        this.$emit("input", val);
      },
      get() {
        return this.value;
      }
    }
  },
  methods: {
    change(val) {
      this.$emit('change', val);
    }
  }
};
</script>