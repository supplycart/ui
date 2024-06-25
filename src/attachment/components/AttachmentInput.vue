<template>
    <div :class="{ 'input-error': showError }">
        <slot name="label">
            <label v-if="label" :for="$attrs.id">
                {{ label }}
                <small v-if="required" class="italic text-red-600">*</small>
            </label>
        </slot>

        <BaseAttachment
            v-model="input"
            v-bind="$props"
            @change="change"
            @deleted="deleted"
            @onError="onError"
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
                />
                <div class="w-full">
                    <span>Click to Attach Document (max {{ maxSize }}mb)</span>
                </div>
            </label>
        </BaseAttachment>

        <slot name="error" />
        <slot name="description" />
    </div>
</template>
<script>
import BaseAttachment from "./BaseAttachment.vue";

export default {
    components: { BaseAttachment },
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        format: {
            type: Array,
            default: () => [],
        },
        label: {
            type: String,
            default: null,
        },
        maxSize: {
            type: Number,
            validator: function (value) {
                return value <= 30;
            },
        },
        error: {
            type: [String, Boolean],
            default: null,
        },
        required: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        input: {
            set(val) {
                this.$emit("input", val);
            },
            get() {
                return this.value;
            },
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
        input: {
            handler(val) {
                if (!val.length && this.required) {
                    this.showError = true;
                } else {
                    this.showError = false;
                }
            },
        },
    },
    data() {
        return {
            showError: false,
        };
    },
    methods: {
        change(val) {
            this.$emit("change", val);
        },
        deleted(val) {
            this.$emit("deleted", val);
        },
        onError(val) {
            this.$emit("onError", val);
        },
    },
};
</script>
