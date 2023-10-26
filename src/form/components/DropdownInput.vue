<template>
    <div class="input-holder">
        <slot name="label">
            <label v-if="formLabel" :for="$attrs.id">
                {{ formLabel }}
                <small v-if="required" class="italic text-red-600">*</small>
                <slot name="info" />
            </label>
        </slot>

        <VSelect
            v-model="input"
            v-bind="$attrs"
            :disabled="disabled"
            :options="options"
            :class="[
                !isValid ? 'input-error dropdown-input-error' : '',
                inputClass,
            ]"
            @search="search"
            @close="blur"
            @open="open"
            :taggable="taggable"
            :multiple="multiple"
            appendToBody
        >
            <template #option="option">
                <slot name="option" :option="option" />
            </template>
            <template #no-options>
                <slot name="no-option" />
            </template>
            <template #selected-option="option">
                <slot name="selected-option" :option="option" />
            </template>
        </VSelect>
        <slot name="error">
            <p v-if="!isValid" class="italic text-red-600 text-xs mt-2">
                {{ error }}
            </p>
        </slot>
    </div>
</template>

<script>
import VSelect from "vue-select";
export default {
    components: { VSelect },
    props: {
        id: {
            type: String,
            default: null,
        },
        formLabel: {
            type: String,
            default: null,
        },
        value: {
            type: [String, Number, Array],
            default: null,
        },
        error: {
            type: String,
            default: "Please fill out this field.",
        },
        required: {
            type: Boolean,
            default: false,
        },
        inputClass: {
            type: String,
            default: null,
        },
        options: {
            type: Array,
            default: () => [],
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        taggable: {
            type: Boolean,
            default: false,
        },
        invalid: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showError: false,
        };
    },
    computed: {
        input: {
            get() {
                return this.value;
            },
            set(e) {
                this.$emit("input", e);
                this.required && this.toggleError(e);
            },
        },
        isValid() {
            return !(this.invalid || this.showError);
        },
    },
    watch: {
        error: {
            handler(val) {
                if (val && this.required) {
                    this.showError = true;
                }
            },
        },
    },
    methods: {
        search(e) {
            this.$emit("search", e);
        },
        toggleError(val) {
            if (Array.isArray(val)) {
                this.showError = val.length ? false : true;
            } else {
                this.showError = val ? false : true;
            }
        },
        blur() {
            if (this.required) {
                this.showError = this.value == null;
            }
        },
        open() {
            this.$emit("open");
        },
    },
};
</script>

<style scoped>
.dropdown-input-error {
    border-radius: 5px;
}
</style>
