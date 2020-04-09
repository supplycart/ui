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
            <p>
            <span v-if="value.unit">{{ value.unit }}, </span>
            <span v-if="value.floor">{{ value.floor }}, </span>
            <span v-if="value.building">{{ value.building }}</span>
            </p>
            <p>{{ value.street }}</p>
            <p>{{ value.postcode }} {{ value.city }}, {{ value.state }}</p>
            <p>{{ value.country }}</p>
        </div>
        <div v-if="showAttribute('lift_access')">
            <p v-if="value.lift_access">Lift Access</p>
        </div>
        <div v-if="showAttribute('requires_permit')">
            <p v-if="value.requires_permit">Requires Permit</p>
        </div>
    </div>
</template>
<script>
    import AddressMixins from "../../mixins/address"
    export default {
        name: "MalaysiaDeliveryAddress",
        mixins: [AddressMixins]
    };
</script>