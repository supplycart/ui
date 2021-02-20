<template>
    <button :type="type" :disabled="disabled">
        <slot />
        <slot name="title">
            <span>{{ title }}</span>
        </slot>
    </button>
</template>
<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: "Button",
        },
        type: {
            type: String,
            default: "button",
        },
    },
};
</script>
