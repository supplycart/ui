<script>
import { startCase } from "lodash-es";
import { defineComponent, h } from "vue";
import DeliveryAddress from "./DeliveryAddress.vue";
import BillingAddress from "./BillingAddress.vue";
import GeneralAddress from "./GeneralAddress.vue";

export default defineComponent({
    name: "AddressNew",
    components: {
        DeliveryAddress,
        BillingAddress,
        GeneralAddress,
    },
    props: {
        modelValue: {
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
    emits: ["update:modelValue"],
    computed: {
        component() {
            const type = startCase(this.type);
            return `${type}Address`;
        },
    },
    render() {
        return h("keep-alive", [
            h("component", {
                is: this.component,
                ...this.$props,
            }),
        ]);
    },
});
</script>
