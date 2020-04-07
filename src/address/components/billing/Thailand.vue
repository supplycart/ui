<template>
    <div>
        <p>
            {{ value.entity_name }}
        </p>
        <p>{{ value.pic_name }} - {{ value.pic_phone }}</p>
        <p>
            <span v-if="value.unit">{{ value.unit }}, </span>
            <span v-if="value.floor">{{ value.floor }}, </span>
            <span v-if="value.building">{{ value.building }}</span>
        </p>
        <p>{{ value.street }}</p>
        <p>{{ value.postcode }} {{ value.city }}, {{ value.state }}</p>
        <p>{{ value.country }}</p>
        <p v-if="value.einvoice_email">E-Invoice Mailbox: {{ value.einvoice_email }}</p>
        <p v-if="value.registration_no">Registration No.: {{ value.registration_no }}</p>
    </div>
</template>
<style src="../../../styles/address/address.css" scoped></style>
<script>
    export default {
        name: "ThailandBillingAddress",
        props: {
            value: {
                type: Object,
                default: () => ({})
            }
        }
    };
</script>