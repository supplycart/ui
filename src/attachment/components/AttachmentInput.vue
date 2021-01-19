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
      :required="required"
      @change="change"
      @deleted="deleted"
    >
      <label
        slot-scope="{ setAttachment, maxSize }"
        for="attachment_input"
        class="block cursor-pointer"
      >
        <input
          id="attachment_input"
          type="file"
          :required="required"
          class="hidden"
          @change="setAttachment"
        >

        <!-- add this section to retrieve input value from parent component, as input type = file value is not accessible from parent -->
        <input type="text" 
          :value="input" 
          class="hidden" 
          id="attachment_input_value"/>
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
    required: {
      type: Boolean
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
    },
    deleted(val) {
      this.$emit('deleted', val)
    }
  }
};
</script>
