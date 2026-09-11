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
    name: "BillingAddress",
});

const addressLine1 = computed(() => {
    const parts = []

    // Street (Singapore only, first)
    if (addressCountry.value === 'SINGAPORE' && props.modelValue.street) {
        parts.push(props.modelValue.street)
    }

    // Unit (non-Singapore)
    if (
        props.modelValue.unit &&
        addressCountryConfig.value.unit &&
        addressCountry.value !== 'SINGAPORE'
    ) {
        parts.push(props.modelValue.unit)
    }

    // Floor
    if (props.modelValue.floor && addressCountryConfig.value.floor) {
        parts.push(props.modelValue.floor)
    }

    // Unit (Singapore)
    if (
        props.modelValue.unit &&
        addressCountryConfig.value.unit &&
        addressCountry.value === 'SINGAPORE'
    ) {
        parts.push(props.modelValue.unit)
    }

    // Building
    if (props.modelValue.building && addressCountryConfig.value.building) {
        parts.push(props.modelValue.building)
    }

    // Street (non-Singapore)
    if (
        props.modelValue.street &&
        addressCountryConfig.value.street &&
        addressCountry.value !== 'SINGAPORE'
    ) {
        parts.push(props.modelValue.street)
    }

    // City + comma if postcode exists
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

    // Postcode
    if (props.modelValue.postcode && (
        addressCountryConfig.value.postcode ||
        addressCountryConfig.value.zipcode
    )) {
        parts.push(props.modelValue.postcode)
    }

    // State / Province
    if (props.modelValue.state && (
        addressCountryConfig.value.state ||
        addressCountryConfig.value.province
    )) {
        parts.push(props.modelValue.state)
    }

    // Country (always last)
    if (props.modelValue.country) {
        parts.push(props.modelValue.country)
    }

    return parts.join(', ')
});
</script>

<template>
    <div>
        <div>
            <p>
                <span v-if="showAttribute('entity_name')">{{
                    props.modelValue.entity_name
                }}</span>

                <span
                    v-if="
                        showAttribute('registration_no') &&
                        props.modelValue.registration_no
                    "
                    >&nbsp;({{ props.modelValue.registration_no }})</span
                >
            </p>
        </div>
        <div>
            <div v-if="props.display.length > 0">
                <span v-if="showAttribute('pic_name')">
                    {{ props.modelValue.pic_name }}
                    <span v-if="showAttribute('pic_phone')">
                </span>
                    - {{ props.modelValue.pic_phone }}
                </span>
            </div>
            <p v-else>{{ props.modelValue.pic_name }} - {{ props.modelValue.pic_phone }}</p>
        </div>
        <div v-if="showAttribute('address')">
            <p>{{ addressLine1 }}</p>
            <p>{{ addressLine2 }}</p>
        </div>
        <div v-if="showAttribute('sales_tax_registration_no')">
            <p v-if="props.modelValue.sales_tax_registration_no">
                {{ LABELS.SALES_TAX_REGISTRATION_NO }}:
                {{ props.modelValue.sales_tax_registration_no }}
            </p>
        </div>
        <div v-if="showAttribute('service_tax_registration_no')">
            <p v-if="props.modelValue.service_tax_registration_no">
                {{ LABELS.SERVICE_TAX_REGISTRATION_NO }}:
                {{ props.modelValue.service_tax_registration_no }}
            </p>
        </div>
        <div v-if="showAttribute('ref_no')">
            <p v-if="props.modelValue.ref_no">
                {{ LABELS.BILLING_ENTITY_CODE }}: {{ props.modelValue.ref_no }}
            </p>
        </div>
        <div v-if="showAttribute('einvoice_email')">
            <p v-if="props.modelValue.einvoice_email">
                {{ LABELS.E_INVOICE_MAILBOX }}: {{ props.modelValue.einvoice_email }}
            </p>
        </div>
    </div>
</template>
