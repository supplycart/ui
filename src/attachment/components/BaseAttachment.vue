<script setup>
import { computed } from "vue";
import { validateAttachmentFormat, validateAttachmentSize } from "../index";

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
    mode: {
        type: String,
        default: "multiple",
        validator: (prop) => ["multiple", "single"].includes(prop),
    },
    maxSize: {
        type: Number,
        default: 30,
    },
    format: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(["update:modelValue", "change", "deleted", "onError"]);

const attachments = computed(() => {
    return props.modelValue || [];
});

const setAttachment = async (event) => {
    let currentAttachments = [...attachments.value];

    const files =
        props.mode === "single"
            ? [event.target.files[0]]
            : Array.from(event.target.files);

    files.forEach((file) => {
        if (
            validateAttachmentSize(file, props.maxSize) &&
            validateAttachmentFormat(file, props.format)
        ) {
            currentAttachments.push(file);
        } else {
            const message = [];
            if (!validateAttachmentSize(file, props.maxSize)) {
                message.push(
                    `File ${file.name} has exceeded limit of ${props.maxSize}MB`,
                );
            }
            if (!validateAttachmentFormat(file, props.format)) {
                message.push(
                    `File format for ${file.name} not supported`,
                );
            }
            emit("onError", message);
        }
    });

    event.target.value = null;
    emit("update:modelValue", currentAttachments);
    emit("change", currentAttachments);
};

const deleteAttachment = async (index) => {
    const data = {
        index: index,
        file: attachments.value[index],
    };
    emit("deleted", data);

    const updatedAttachments = [...attachments.value];
    updatedAttachments.splice(index, 1);
    emit("update:modelValue", updatedAttachments);
};
</script>

<template>
    <slot
        :attachments="attachments"
        :set-attachment="setAttachment"
        :delete-attachment="deleteAttachment"
        :max-size="maxSize"
    />
</template>
