<template>
  <div>
    <slot name="label">
      <label
        v-if="label"
        :for="$attrs.id"
        class="inline-block mb-2"
      >
        {{ label }}
        <small
          v-if="required"
          class="italic text-red-600"
        >*</small>
      </label>
    </slot>

    <input
      :id="$attrs.id"
      v-model="input"
      v-bind="$attrs"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="[showError ? 'input-error' : '', inputClass]"
      class="w-full"
      @focus="focus"
      @blur="blur"
    >

    <slot name="error">
      <p
        v-if="showError && !input"
        class="italic text-red-600 text-sm mt-2"
      >
        {{ error }}
      </p>
    </slot>
    <slot name="description">
      <p
        v-if="description"
        class="italic text-sm mt-2"
      >
        {{ description }}
      </p>
    </slot>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
		},
		required: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: null
		},
		disabled: {
			type: Boolean,
			default: false
		},
		error: {
			type: String,
			default: 'Please fill out this field.'
		},
		description: {
			type: String,
			default: null
		},
		inputClass: {
			type: String,
			default: null
		}
  },
	data() {
		return {
			showError: false
		}
	},
  computed: {
    input: {
      set(val) {
				this.$emit("input", val);
				this.required && this.toggleError(val);
      },
      get() {
        return this.value;
      }
    }
	},
  methods: {
    blur(e) {
			this.$emit('blur', e.target.value);
		},
		focus() {
			this.required && this.toggleError(this.input);
		},
		toggleError(val) {
			this.showError = val ? false : true;
		}
  }
};
</script>
<style>
.input-error {
  border-width: 1px;
  border-color: #f56565 !important;
}
</style>