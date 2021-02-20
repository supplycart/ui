<template>
    <div>
        <div v-if="showAttribute('entity_name')">
            <p>
                {{ value.entity_name }}
            </p>
        </div>
        <div>
            <div v-if="this.display.length > 0">
                <div v-if="showAttribute('pic_name')">
                    {{ value.pic_name }}
                </div>
                <div v-if="showAttribute('pic_phone')">
                    {{ value.pic_phone }}
                </div>
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
                E-Invoice Mailbox: {{ value.einvoice_email }}
            </p>
        </div>
        <div v-if="showAttribute('registration_no')">
            <p v-if="value.registration_no">
                Registration No.: {{ value.registration_no }}
            </p>
        </div>
    </div>
</template>
<script>
import AddressMixins from "../../mixins/address";
export default {
    name: "CambodiaBillingAddress",
    mixins: [AddressMixins],
};
</script>
