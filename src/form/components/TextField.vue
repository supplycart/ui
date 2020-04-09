<template>
  <div>
    <slot name="label">
      <label class="font-bold">{{ label }}</label>
    </slot>
    <div
      v-if="value"
      class="leading-normal"
    >
      <slot>
        {{ value }}
      </slot>
    </div>
    <div
      v-if="!value && showError"
      class="italic text-red-500"
    >
      {{ errorMessage }}
    </div>
    <div
      v-if="!value && showDefault && !showError"
      class="italic"
    >
      {{ defaultMessage }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "Label"
    },
    value: {
      type: String,
      default: null
    },
    showError: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: "Missing information"
    },
    showDefault: {
      type: Boolean,
      default: true
    },
    defaultMessage: {
      type: String,
      default: "N/A"
    }
  }
};
</script>