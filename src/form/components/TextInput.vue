<template>
    <div>
        <slot name="label">
            <FormLabel
                :id="$attrs.id"
                :label="label"
                :required="required"
                :disabled="disabled"
                class="inline-block mb-2"
            />
        </slot>
        <input
            :id="$attrs.id"
            v-model="input"
            v-bind="$attrs"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"
            :maxlength="maxLength"
            :class="[showError ? 'input-error' : '', inputClass]"
            class="w-full"
            @focus="focus"
            @blur="blur"
            @keydown="keydown"
        />

        <slot name="error">
            <p
                v-if="showError && !input"
                class="italic text-red-600 text-xs mt-2"
            >
                {{ error }}
            </p>
        </slot>
        <slot name="description">
            <p
                v-if="description"
                class="italic text-xs mt-1"
                :class="inputDescClass"
            >
                {{ description }}
            </p>
        </slot>
    </div>
</template>
<script>
import FormLabel from "./FormLabel.vue";

export default {
    components: { FormLabel },
    inheritAttrs: false,
    props: {
        value: {
            type: [String, Number],
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        required: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        error: {
            type: String,
            default: "Please fill in this field.",
        },
        description: {
            type: String,
            default: null,
        },
        inputClass: {
            type: String,
            default: null,
        },
        maxLength: {
            type: Number,
            default: null,
        },
        inputDescClass: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            showError: false,
        };
    },
    computed: {
        input: {
            set(val) {
                this.$emit("input", val);
                this.required && this.toggleError(val);
            },
            get() {
                return this.value;
            },
        },
    },
    watch: {
        error: {
            handler(val) {
                if (!val && this.required) {
                    this.showError = true;
                }
            },
        },
    },
    methods: {
        blur(e) {
            this.$emit("blur", e.target.value);
        },
        focus() {
            this.$emit("focus");
            this.required && this.toggleError(this.input);
        },
        toggleError(val) {
            this.showError = val ? false : true;
        },
        keydown() {
            this.$emit("keydown");
        },
    },
};
</script>
<style>
.input-error {
    border-width: 1px;
    border-color: #f56565 !important;
}
</style>
