<script setup>
import { computed } from "vue";
import { startCase } from "lodash-es";
import DeliveryAddress from "./DeliveryAddress.vue";
import BillingAddress from "./BillingAddress.vue";
import GeneralAddress from "./GeneralAddress.vue";

// Define props
const props = defineProps({
    modelValue: {
        type: [Array, Object],
        default: () => ({}),
    },
    country: {
        type: String,
        default: "Malaysia",
    },
    type: {
        type: String,
        required: true,
    },
    display: {
        type: Array,
        default: () => [],
    },
});

// Define emits
defineEmits(["update:modelValue"]);

// Component map for dynamic rendering
const components = {
    BillingAddress,
    DeliveryAddress,
    GeneralAddress,
};

// Computed component name
const component = computed(() => {
    const type = startCase(props.type);
    const componentName = `${type}Address`;
    return components[componentName];
});

// Define options
defineOptions({
    name: "AddressNew",
});
</script>

<template>
    <component
        :is="component"
        :model-value="props.modelValue"
        :country="props.country"
        :display="props.display"
    />
</template>
