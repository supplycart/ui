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

// Values (same as original)
const value = props.modelValue;
const display = props.display;

// Define component options
defineOptions({
    name: "DeliveryAddress",
});

const addressLine1 = computed(() => {
    const parts = []

    if (addressCountry.value === 'SINGAPORE' && value.street) {
        parts.push(value.street)
    }

    if (
        value.unit &&
        addressCountryConfig.value.unit &&
        addressCountry.value !== 'SINGAPORE'
    ) {
        parts.push(value.unit)
    }

    if (value.floor && addressCountryConfig.value.floor) {
        parts.push(value.floor)
    }

    if (
        value.unit &&
        addressCountryConfig.value.unit &&
        addressCountry.value === 'SINGAPORE'
    ) {
        parts.push(value.unit)
    }

    if (value.building && addressCountryConfig.value.building) {
        parts.push(value.building)
    }

    if (value.street && (
        addressCountryConfig.value.street &&
        addressCountry.value !== 'SINGAPORE'
    )) {
        parts.push(value.street)
    }

    if (value.city && (
        addressCountryConfig.value.city ||
        addressCountryConfig.value.district
    )) {
        let city = value.city

        if (value.city && value.postcode) {
            city += ','
        }

        parts.push(city)
    }

    return parts.join(', ')
});
const addressLine2 = computed(() => {
    const parts = []

    if (value.postcode && (
        addressCountryConfig.value.postcode ||
        addressCountryConfig.value.zipcode
    )) {
        parts.push(value.postcode)
    }

    if (value.state && (
        addressCountryConfig.value.state ||
        addressCountryConfig.value.province
    )) {
        parts.push(value.state)
    }

    if (value.country) {
        parts.push(value.country)
    }

    return parts.join(', ')
})
</script>

<template>
    <div>
        <div v-if="showAttribute('branch_name')">
            <p>
                {{ value.branch_name }}
            </p>
        </div>
        <div v-if="showAttribute('pic_phone')">
            <p v-if="value.pic_phone">{{ value.pic_phone }}</p>
        </div>
        <div v-if="showAttribute('recipient_name')">
            <p v-if="value.recipient_name">{{ value.recipient_name }}</p>
        </div>
        <div v-if="showAttribute('recipient_phone')">
            <p v-if="value.recipient_phone">{{ value.recipient_phone }}</p>
        </div>
        <div v-if="showAttribute('address')">
            <p>{{ addressLine1 }}</p>
            <p>{{ addressLine2 }}</p>
        </div>
        <div>
            <div v-if="showAttribute('lift_access') && display.length > 0">
                <p v-if="value.lift_access">Lift Access</p>
            </div>
            <div v-if="!display.length">
                <p>Lift Access: {{ value.lift_access }}</p>
            </div>
        </div>

        <div>
            <div v-if="showAttribute('requires_permit') && display.length > 0">
                <p v-if="value.requires_permit">Requires Permit</p>
            </div>
            <div v-if="!display.length">
                <p>Requires Permit: {{ value.requires_permit }}</p>
            </div>
            <div v-if="showAttribute('warehouse')">
                <p v-if="value.warehouse">Warehouse</p>
            </div>
        </div>
        <div v-if="showAttribute('ref_no')">
            <p v-if="value.ref_no">Location Code: {{ value.ref_no }}</p>
        </div>
    </div>
</template>
