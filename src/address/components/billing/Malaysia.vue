<template>
    <div>
        <p>
            {{ value.entityName }}
        </p>
        <p>{{ value.picName }} - {{ value.picPhoneNo }}</p>
        <p>
            <span v-if="value.unit">{{ value.unit }}, </span>
            <span v-if="value.floor">{{ value.floor }}, </span>
            <span v-if="value.building">{{ value.building }}</span>
        </p>
        <p>{{ value.street }}</p>
        <p>{{ value.postcode }} {{ value.city }}, {{ value.state }}</p>
        <p>{{ value.country }}</p>
        <p v-if="value.invoiceEmail">E-Invoice Mailbox: {{ value.invoiceEmail }}</p>
        <p v-if="value.registrationNo">Registration No.: {{ value.registrationNo }}</p>
    </div>
</template>

<script>
    export default {
        name: "MalaysiaBillingAddress",
        props: {
            value: {
                type: Object,
                default: () => ({})
            }
        }
    };
</script>