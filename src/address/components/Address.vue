<script>
import { startCase } from "lodash";

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
        JapanBillingAddress: () => import("./billing/Japan"),
        UnitedStatesOfAmericaBillingAddress: () =>
            import("./billing/UnitedStatesOfAmerica"),

        MalaysiaDeliveryAddress: () => import("./delivery/Malaysia"),
        CambodiaDeliveryAddress: () => import("./delivery/Cambodia"),
        SingaporeDeliveryAddress: () => import("./delivery/Singapore"),
        IndonesiaDeliveryAddress: () => import("./delivery/Indonesia"),
        ThailandDeliveryAddress: () => import("./delivery/Thailand"),
        HongKongDeliveryAddress: () => import("./delivery/HongKong"),
        PhilippinesDeliveryAddress: () => import("./delivery/Philippines"),
        VietnamDeliveryAddress: () => import("./delivery/Vietnam"),
        NorwayDeliveryAddress: () => import("./delivery/Norway"),
        JapanDeliveryAddress: () => import("./delivery/Japan"),
        UnitedStatesOfAmericaDeliveryAddress: () =>
            import("./delivery/UnitedStatesOfAmerica"),
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
            const supportedBillingAddressCountries = [
                "Malaysia",
                "Cambodia",
                "Singapore",
                "Indonesia",
                "Thailand",
                "HongKong",
                "Philippines",
                "Vietnam",
            ];

            const supportedDeliveryAddressCountries = [
                "Malaysia",
                "Cambodia",
                "Singapore",
                "Indonesia",
                "Thailand",
                "HongKong",
                "Philippines",
                "Vietnam",
                "Norway",
                "UnitedStatesOfAmerica",
            ];

            const type = startCase(this.type);
            let country = startCase(this.country);

            if (
                (type === "Billing" &&
                    !supportedBillingAddressCountries.includes(country)) ||
                (type === "Delivery" &&
                    !supportedDeliveryAddressCountries.includes(country))
            ) {
                country = "Malaysia"; // Fall back to use Malaysia's
            }

            return `${country.split(" ").join("")}${type}Address`;
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
