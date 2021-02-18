<template>
  <div class="input-holder">
    <slot name="label">
      <label
        v-if="formLabel"
        :for="$attrs.id"
      >
        {{ formLabel }}
        <small
          v-if="required"
          class="italic text-red-600"
        >*</small>
      </label>
    </slot>
    
    <VSelect
      v-model="input"
      v-bind="$attrs"
      :disabled="disabled"
      :options="options"
      :class="[showError ? 'input-error dropdown-input-error' : '', inputClass]"
      @search="search"
    />
    <slot name="error">
      <p
        v-if="showError"
        class="italic text-red-600 text-xs mt-2"
      >
        {{ error }}
      </p>
    </slot>
  </div>
</template>

<script>
import VSelect from "vue-select"
export default {
    components: {VSelect},
    props: {
        id: {
            type: String,
            default: null
        },
        formLabel: {
            type: String,
            default: null
        },
        value: {
            type: [String,Number,Array],
            default: null
        },
        error: {
            type: String,
            default: "Please fill out this field."
        },
        required: {
            type: Boolean,
            default: false
        },
        inputClass: {
            type: String,
            default: null
        },
        options: {
            type: Array,
            default: () => ([])
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showError: true
        };
    },
    computed: {
        input: {
                get() {
                    return this.value;
                },
                set(e) {
                    this.$emit('input', e);
                    console.log(e)
                    this.required && this.toggleError(e);
                }
            },
    },
    watch: {
        error: {
            handler(val) {
                if(val && this.required) {
                    this.showError = true
                }
            },
        }
    },
    methods: {
        search(e){
            this.$emit('search', e)
        },
        toggleError(val) {
            if(Array.isArray(val)) {
                this.showError = val.length ? false : true;
            }else {
                this.showError = val ? false : true;
            }
        }
    }

}
</script>

<style scoped>
    .dropdown-input-error {
        border-radius: 5px;
    }
</style>