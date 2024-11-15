<script>
import { startCase } from "lodash";

export default {
    name: "AddressNew",
    components: {
        DeliveryAddress: () => import("./DeliveryAddress.vue"),
        BillingAddress: () => import("./BillingAddress.vue"),
        GeneralAddress: () => import("./GeneralAddress.vue"),
    },
    props: {
        value: {
            type: [Array, Object],
            default: () => ({}),
        },
        country: {
            type: String,
            default: "Malaysia",
        },
        type: {
            type: String,
            required: true,
        },
        display: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        component() {
            const type = startCase(this.type);

            return `${type}Address`;
        },
    },
    render(createElement) {
        return createElement("keep-alive", [
            createElement("component", {
                is: this.component,
                props: this.$props,
            }),
        ]);
    },
};
</script>
