<script setup>
import { ref, watch } from "vue";
import BaseAttachment from "./BaseAttachment.vue";
import { useFilteredAttrs } from "../../form/composables/useFilteredAttrs.js";

const props = defineProps({
    modelValue: {
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
});

const emit = defineEmits(["update:modelValue", "change", "deleted", "onError"]);

const showError = ref(false);

const updateValue = (val) => {
    emit("update:modelValue", val);
};

const change = (val) => {
    emit("change", val);
};

const deleted = (val) => {
    emit("deleted", val);
};

const onError = (val) => {
    emit("onError", val);
};

watch(
    () => props.error,
    (val) => {
        if (val && props.required) {
            showError.value = true;
        }
    },
);

watch(
    () => props.modelValue,
    (val) => {
        if (!val.length && props.required) {
            showError.value = true;
        } else {
            showError.value = false;
        }
    },
);

// Use filtered attrs to handle Vue 3 compatibility
const { filteredAttrs } = useFilteredAttrs();

// Define options
defineOptions({
    inheritAttrs: false,
});
</script>

<template>
    <div :class="{ 'input-error': showError }">
        <slot name="label">
            <label v-if="label" :for="filteredAttrs.id">
                {{ label }}
                <small v-if="required" class="italic text-red-600">*</small>
            </label>
        </slot>

        <BaseAttachment
            :model-value="modelValue"
            :format="format"
            :max-size="maxSize"
            @update:model-value="updateValue"
            @change="change"
            @deleted="deleted"
            @onError="onError"
        >
            <template #default="{ setAttachment, maxSize }">
                <label for="attachment_input" class="block cursor-pointer">
                    <input
                        id="attachment_input"
                        type="file"
                        class="hidden"
                        @change="setAttachment"
                    />
                    <div class="w-full">
                        <span
                            >Click to Attach Document (max
                            {{ maxSize }}mb)</span
                        >
                    </div>
                </label>
            </template>
        </BaseAttachment>

        <slot name="error" />
        <slot name="description" />
    </div>
</template>
