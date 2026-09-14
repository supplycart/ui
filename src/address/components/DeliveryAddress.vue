<script setup>
import { computed } from "vue";
import { useAddress } from "../composables/useAddress";

// Define props
const props = defineProps({
    modelValue: {
        type: [Array, Object],
        default: () => ({}),
    },
    display: {
        type: Array,
        default: () => [],
    },
    country: {
        type: String,
        default: "Malaysia",
    },
});

// Use address composable
const { LABELS, addressCountry, addressCountryConfig, showAttribute } =
    useAddress(props);

// Define component options
defineOptions({
    name: "DeliveryAddress",
});

const addressLine1 = computed(() => {
    const parts = []

    if (addressCountry.value === 'SINGAPORE' && props.modelValue.street) {
        parts.push(props.modelValue.street)
    }

    if (
        props.modelValue.unit &&
        addressCountryConfig.value.unit &&
        addressCountry.value !== 'SINGAPORE'
    ) {
        parts.push(props.modelValue.unit)
    }

    if (props.modelValue.floor && addressCountryConfig.value.floor) {
        parts.push(props.modelValue.floor)
    }

    if (
        props.modelValue.unit &&
        addressCountryConfig.value.unit &&
        addressCountry.value === 'SINGAPORE'
    ) {
        parts.push(props.modelValue.unit)
    }

    if (props.modelValue.building && addressCountryConfig.value.building) {
        parts.push(props.modelValue.building)
    }

    if (props.modelValue.street && (
        addressCountryConfig.value.street &&
        addressCountry.value !== 'SINGAPORE'
    )) {
        parts.push(props.modelValue.street)
    }

    if (props.modelValue.city && (
        addressCountryConfig.value.city ||
        addressCountryConfig.value.district
    )) {
        let city = props.modelValue.city

        if (props.modelValue.city && props.modelValue.postcode) {
            city += ','
        }

        parts.push(city)
    }

    return parts.join(', ')
});
const addressLine2 = computed(() => {
    const parts = []

    if (props.modelValue.postcode && (
        addressCountryConfig.value.postcode ||
        addressCountryConfig.value.zipcode
    )) {
        parts.push(props.modelValue.postcode)
    }

    if (props.modelValue.state && (
        addressCountryConfig.value.state ||
        addressCountryConfig.value.province
    )) {
        parts.push(props.modelValue.state)
    }

    if (props.modelValue.country) {
        parts.push(props.modelValue.country)
    }

    return parts.join(', ')
})
</script>

<template>
    <div>
        <div v-if="showAttribute('branch_name')">
            <p>
                {{ props.modelValue.branch_name }}
            </p>
        </div>
        <div v-if="showAttribute('pic_phone')">
            <p v-if="props.modelValue.pic_phone">{{ props.modelValue.pic_phone }}</p>
        </div>
        <div v-if="showAttribute('recipient_name')">
            <p v-if="props.modelValue.recipient_name">{{ props.modelValue.recipient_name }}</p>
        </div>
        <div v-if="showAttribute('recipient_phone')">
            <p v-if="props.modelValue.recipient_phone">{{ props.modelValue.recipient_phone }}</p>
        </div>
        <div v-if="showAttribute('address')">
            <p>{{ addressLine1 }}</p>
            <p>{{ addressLine2 }}</p>
        </div>
        <div>
            <div v-if="showAttribute('lift_access') && props.display.length > 0">
                <p v-if="props.modelValue.lift_access">Lift Access</p>
            </div>
            <div v-if="!props.display.length">
                <p>Lift Access: {{ props.modelValue.lift_access }}</p>
            </div>
        </div>

        <div>
            <div v-if="showAttribute('requires_permit') && props.display.length > 0">
                <p v-if="props.modelValue.requires_permit">Requires Permit</p>
            </div>
            <div v-if="!props.display.length">
                <p>Requires Permit: {{ props.modelValue.requires_permit }}</p>
            </div>
            <div v-if="showAttribute('warehouse')">
                <p v-if="props.modelValue.warehouse">Warehouse</p>
            </div>
        </div>
        <div v-if="showAttribute('ref_no')">
            <p v-if="props.modelValue.ref_no">Location Code: {{ props.modelValue.ref_no }}</p>
        </div>
    </div>
</template>
