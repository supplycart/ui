<script>
import { startCase, lowerCase } from "lodash";

export default {
    name: "Address",
    components: {
        MalaysiaBillingAddress: () => import("./billing/Malaysia"),
        CambodiaBillingAddress: () => import("./billing/Cambodia"),
        SingaporeBillingAddress: () => import("./billing/Singapore"),
        IndonesiaBillingAddress: () => import("./billing/Indonesia"),
        ThailandBillingAddress: () => import("./billing/Thailand"),
        HongKongBillingAddress: () => import("./billing/HongKong"),
        PhilippinesBillingAddress: () => import("./billing/Philippines"),
        VietnamBillingAddress: () => import("./billing/Vietnam"),

        MalaysiaDeliveryAddress: () => import("./delivery/Malaysia"),
        CambodiaDeliveryAddress: () => import("./delivery/Cambodia"),
        SingaporeDeliveryAddress: () => import("./delivery/Singapore"),
        IndonesiaDeliveryAddress: () => import("./delivery/Indonesia"),
        ThailandDeliveryAddress: () => import("./delivery/Thailand"),
        HongKongDeliveryAddress: () => import("./delivery/HongKong"),
        PhilippinesDeliveryAddress: () => import("./delivery/Philippines"),
        VietnamDeliveryAddress: () => import("./delivery/Vietnam"),
    },
    props: {
        value: {
            type: Object,
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
            let type = startCase(this.type);
            let country = startCase(this.country);

            if (this.country.match(/\s/g)) {
                let split = this.country.split(" ");
                let fName = split[0];
                let lName = split[1];
                return `${fName}${lName}${type}Address`;
            }

            return `${country}${type}Address`;
        },
    },
    render(createElement, context) {
        return createElement("keep-alive", [
            createElement("component", {
                is: this.component,
                props: this.$props,
            }),
        ]);
    },
};
</script>
