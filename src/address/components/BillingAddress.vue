<script setup>
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
            <p>
                <span v-if="addressCountry == 'SINGAPORE'">
                    {{ value.street }}</span
                >
                <span
                    v-if="
                        value.unit &&
                        addressCountryConfig.unit &&
                        addressCountry !== 'SINGAPORE'
                    "
                    >{{ value.unit }},
                </span>
                <span v-if="value.floor && addressCountryConfig.floor"
                    >{{ value.floor }},
                </span>
                <span
                    v-if="
                        value.unit &&
                        addressCountryConfig.unit &&
                        addressCountry == 'SINGAPORE'
                    "
                    >{{ value.unit }},
                </span>
                <span v-if="value.building">{{ value.building }}, </span>
                <span v-if="addressCountry !== 'SINGAPORE'">
                    {{ value.street }},
                </span>
                <span v-if="value.city"> {{ value.city }}, </span>
                <span
                    v-if="
                        value.postcode &&
                        (addressCountryConfig.state ||
                            addressCountryConfig.province)
                    "
                >
                    {{ value.postcode }}
                </span>
                <span
                    v-if="
                        addressCountryConfig.state ||
                        addressCountryConfig.province
                    "
                >
                    {{ value.state
                    }}{{ value.state && value.country ? "," : "" }}
                </span>
                {{ value.country }}
            </p>
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
