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
            <div v-if="this.display.length > 0">
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
                <span v-if="addressCountry == 'SINGAPORE'"> {{ value.street }}</span>
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
                <span v-if="value.building && addressCountryConfig.building">{{
                    value.building
                }}</span>
            <span
                v-if="
                    addressCountryConfig.street &&
                    addressCountry !== 'SINGAPORE'
                "
            >
                {{ value.street }}
            </span>
                <span
                    v-if="
                        addressCountryConfig.city ||
                        addressCountryConfig.district
                    "
                >
                    {{ value.city
                    }}{{ value.city && value.postcode ? "," : "" }}
                </span>
                <span
                    v-if="
                        addressCountryConfig.postcode ||
                        addressCountryConfig.zipcode
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
                {{ LABELS.SALES_TAX_REGISTRATION_NO }}: {{ value.sales_tax_registration_no }}
            </p>
        </div>
        <div v-if="showAttribute('service_tax_registration_no')">
            <p v-if="value.service_tax_registration_no">
                {{ LABELS.SERVICE_TAX_REGISTRATION_NO }}: {{ value.service_tax_registration_no }}
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
<script>
import AddressMixins from "../mixins/address";
export default {
    name: "BillingAddress",
    mixins: [AddressMixins],
};
</script>
