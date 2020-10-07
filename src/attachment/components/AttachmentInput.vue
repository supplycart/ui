<template>
  <div>
    <slot name="label">
      <label
        v-if="label"
        :for="$attrs.id"
      >
        {{ label }}
        <small
          v-if="required"
          class="italic text-red-600"
        >*</small>
      </label>
    </slot>

    <BaseAttachment
      v-model="input"
      v-bind="$props"
      @change="change"
    >
      <label
        slot-scope="{ setAttachment, maxSize }"
        for="attachment_input"
        class="block cursor-pointer"
      >
        <input
          id="attachment_input"
          type="file"
          class="hidden"
          @change="setAttachment"
        >
        <div
          class="w-full"
        >
          <span>Click to Attach Document (max {{ maxSize }}mb)</span>
        </div>
      </label>
    </BaseAttachment>

    <slot name="error" />
    <slot name="description" />
  </div>
</template>
<script>
import BaseAttachment from "./BaseAttachment";

export default {
  components: {BaseAttachment},
  props: {
    value: {
      type: Array,
      default: () => []
    },
    format: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: null
    },
    maxSize: {
      type: Number
    },
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
      this.$emit("change", val);
    }
  }
};
</script>
