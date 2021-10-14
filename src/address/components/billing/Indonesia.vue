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
                <span v-if="value.unit">{{ value.unit }}, </span>
                <span v-if="value.floor">{{ value.floor }}, </span>
                <span v-if="value.building">{{ value.building }}</span>
            </p>
            <p>{{ value.street }}</p>
            <p>{{ value.city }}, {{ value.postcode }}</p>
            <p>{{ value.state }}, {{ value.country }}</p>
        </div>
        <div v-if="showAttribute('einvoice_email')">
            <p v-if="value.einvoice_email">
                {{ LABELS.E_INVOICE_MAILBOX }}: {{ value.einvoice_email }}
            </p>
        </div>
        <div v-if="showAttribute('ref_no')">
            <p v-if="value.ref_no">
                {{ LABELS.BILLING_ENTITY_CODE }}: {{ value.ref_no }}
            </p>
        </div>
    </div>
</template>
<script>
import AddressMixins from "../../mixins/address";
export default {
    name: "IndonesiaBillingAddress",
    mixins: [AddressMixins],
};
</script>
