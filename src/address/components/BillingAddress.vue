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
    name: "BillingAddress",
});

const addressLine1 = computed(() => {
    const parts = []

    // Street (Singapore only, first)
    if (addressCountry.value === 'SINGAPORE' && value.street) {
        parts.push(value.street)
    }

    // Unit (non-Singapore)
    if (
        value.unit &&
        addressCountryConfig.value.unit &&
        addressCountry.value !== 'SINGAPORE'
    ) {
        parts.push(value.unit)
    }

    // Floor
    if (value.floor && addressCountryConfig.value.floor) {
        parts.push(value.floor)
    }

    // Unit (Singapore)
    if (
        value.unit &&
        addressCountryConfig.value.unit &&
        addressCountry.value === 'SINGAPORE'
    ) {
        parts.push(value.unit)
    }

    // Building
    if (value.building && addressCountryConfig.value.building) {
        parts.push(value.building)
    }

    // Street (non-Singapore)
    if (
        value.street &&
        addressCountryConfig.value.street &&
        addressCountry.value !== 'SINGAPORE'
    ) {
        parts.push(value.street)
    }

    // City + comma if postcode exists
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

    // Postcode
    if (value.postcode && (
        addressCountryConfig.value.postcode ||
        addressCountryConfig.value.zipcode
    )) {
        parts.push(value.postcode)
    }

    // State / Province
    if (value.state && (
        addressCountryConfig.value.state ||
        addressCountryConfig.value.province
    )) {
        parts.push(value.state)
    }

    // Country (always last)
    if (value.country) {
        parts.push(value.country)
    }

    return parts.join(', ')
});
</script>

<template>
    <div>
        <div>
            <p>
                <span v-if="showAttribute('entity_name')">{{
                    value.entity_name
                }}</span>

                <span
                    v-if="
                        showAttribute('registration_no') &&
                        value.registration_no
                    "
                    >&nbsp;({{ value.registration_no }})</span
                >
            </p>
        </div>
        <div>
            <div v-if="display.length > 0">
                <span v-if="showAttribute('pic_name')">
                    {{ value.pic_name }}
                </span>
                <span v-if="showAttribute('pic_phone')">
                    - {{ value.pic_phone }}
                </span>
            </div>
            <p v-else>{{ value.pic_name }} - {{ value.pic_phone }}</p>
        </div>
        <div v-if="showAttribute('address')">
            <p>{{ addressLine1 }}</p>
            <p>{{ addressLine2 }}</p>
        </div>
        <div v-if="showAttribute('sales_tax_registration_no')">
            <p v-if="value.sales_tax_registration_no">
                {{ LABELS.SALES_TAX_REGISTRATION_NO }}:
                {{ value.sales_tax_registration_no }}
            </p>
        </div>
        <div v-if="showAttribute('service_tax_registration_no')">
            <p v-if="value.service_tax_registration_no">
                {{ LABELS.SERVICE_TAX_REGISTRATION_NO }}:
                {{ value.service_tax_registration_no }}
            </p>
        </div>
        <div v-if="showAttribute('ref_no')">
            <p v-if="value.ref_no">
                {{ LABELS.BILLING_ENTITY_CODE }}: {{ value.ref_no }}
            </p>
        </div>
        <div v-if="showAttribute('einvoice_email')">
            <p v-if="value.einvoice_email">
                {{ LABELS.E_INVOICE_MAILBOX }}: {{ value.einvoice_email }}
            </p>
        </div>
    </div>
</template>
