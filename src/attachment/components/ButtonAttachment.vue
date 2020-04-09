<template>
  <BaseAttachment 
    v-model="input"
    @change="change"
  >
    <span
      slot-scope="{ setAttachment }"
      class="inline-block cursor-pointer"
    >
      <input
        :id="id"
        type="file"
        class="hidden"
        @change="setAttachment"
      >
      <label
        class="cursor-pointer block"
        :for="id"
      >
        <slot>
          <div class="p-2">{{ label }}</div>
        </slot>
      </label>
    </span>
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