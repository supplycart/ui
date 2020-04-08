<template>
    <div>
        <p>
            {{ value.branch_name }}
        </p>
        <p>{{ value.pic_phone }}</p>
        <p>{{ value.street }},</p>
        <p>
            <span v-if="value.floor">{{ value.floor }}, </span>
            <span v-if="value.unit">{{ value.unit }}, </span>
            <span v-if="value.building">{{ value.building }}</span>
        </p>
        <p>{{ value.city }}, {{ value.postcode }} </p>
        <p>{{ value.country }}</p>
        <p v-if="value.lift_access">Lift Access: {{ value.lift_access }}</p>
        <p v-if="value.requires_permit">Requires Permit: {{ value.requires_permit }}</p>
    </div>
</template>
<script>
    export default {
        name: "SingaporeDeliveryAddress",
        props: {
            value: {
                type: Object,
                default: () => ({})
            }
        }
    };
</script>