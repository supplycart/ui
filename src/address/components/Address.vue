<template>
    <component :is="component" :value="value"/>
</template>
<script>
    import { startCase } from "lodash";
    import MalaysiaBillingAddress from "./billing/Malaysia";
    import MalaysiaDeliveryAddress from "./delivery/Malaysia";

    export default {
        name: "Address",
        components: {
            MalaysiaBillingAddress,
            MalaysiaDeliveryAddress
        },
        props: {
            value: {
                type: Object,
                default: () => ({})
            },
            country: {
                type: String,
                default: "Malaysia"
            },
            type: {
                type: String,
                required: true
            }
        },
        computed: {
            component() {
                let country = startCase(this.country);
                let type = startCase(this.type);

                return `${country}${type}Address`;
            }
        }
    };
</script>

<style scoped>

</style>