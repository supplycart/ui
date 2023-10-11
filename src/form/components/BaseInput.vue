<template>
    <div class="input-holder">
        <slot name="label">
            <label v-if="label" :for="id">
                {{ label }}
                <small v-if="required" class="italic text-red-600">*</small>
            </label>
        </slot>
        <input
            v-model="input"
            v-bind="$attrs"
            :class="[{ 'input-error': showError || isInvalid }, inputClass]"
            :required="required"
            @focus="focus"
            @change="change"
            @blur="blur"
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
    props: {
        id: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        value: {
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
        input: {
            get() {
                return this.value;
            },
            set(e) {
                this.$emit("input", e);
                this.$forceUpdate();
            },
        },
        isInvalid() {
            if (!this.regex) return false;

            const value = this.regex.test(this.input);
            return !value && this.focused && this.input;
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
    },
};
</script>
