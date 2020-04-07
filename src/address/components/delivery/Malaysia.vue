<template>
    <div>{{ value }}</div>
</template>

<script>
    export default {
        name: "MalaysiaDeliveryAddress",
        props: {
            value: {
                type: Object,
                default: () => ({})
            }
        }
    };
</script>