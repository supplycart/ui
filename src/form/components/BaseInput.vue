<template>
    <div class="input-holder">
        <slot name="label">
            <label v-if="label" :for="id">
                {{ label }}
                <small v-if="required" class="italic text-red-600">*</small>
            </label>
        </slot>
        <input
            :value="modelValue"
            v-bind="$attrs"
            :class="[{ 'input-error': showError || isInvalid }, inputClass]"
            :required="required"
            @input="handleInput"
            @focus="focus"
            @change="change"
            @blur="blur"
            @keydown="keydown"
        />

        <slot name="error" :invalid="isInvalid">
            <p v-if="showError" class="text-error">
                {{ error }}
            </p>
            <p v-if="isInvalid && !showError" class="text-error">
                {{ format }}
            </p>
        </slot>

        <slot name="description">
            <p v-if="description" class="text-desc">
                {{ description }}
            </p>
        </slot>
    </div>
</template>
<script>
export default {
    inheritAttrs: false,
    emits: ["update:modelValue", "blur", "change", "focus", "keydown"],
    props: {
        id: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        modelValue: {
            type: [String, Number],
            default: null,
        },
        error: {
            type: String,
            default: null,
        },
        description: {
            type: String,
            default: null,
        },
        regex: {
            type: RegExp,
            default: null,
        },
        required: {
            type: Boolean,
            default: false,
        },
        format: {
            type: String,
            default: "Invalid format",
        },
        inputClass: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            focused: false,
            showError: false,
        };
    },
    computed: {
        isInvalid() {
            if (!this.regex) return false;

            const value = this.regex.test(this.modelValue);
            return !value && this.focused && this.modelValue;
        },
    },
    watch: {
        error: {
            handler(val) {
                if (val && this.required) {
                    this.showError = true;
                } else {
                    this.showError = false;
                }
            },
        },
    },
    methods: {
        handleInput(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        blur(e) {
            this.$emit("blur", e);
        },
        change(e) {
            this.$emit("change", e);
        },
        focus(e) {
            this.$emit("focus", e);
            this.focused = true;
        },
        keydown() {
            this.$emit("keydown");
        },
    },
};
</script>
