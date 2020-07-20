<script>
    import { startCase, lowerCase } from "lodash";

    export default {
        name: "Address",
        components: {

            MalaysiaBillingAddressForm: () => import('./billingForm/Malaysia'),
            CambodiaBillingAddressForm: () => import('./billingForm/Cambodia'),
            SingaporeBillingAddressForm: () => import('./billingForm/Singapore'),
            IndonesiaBillingAddressForm: () => import('./billingForm/Indonesia'),
            ThailandBillingAddressForm: () => import('./billingForm/Thailand'),
            HongKongBillingAddressForm: () => import('./billingForm/HongKong'),
            PhilippinesBillingAddressForm: () => import('./billingForm/Philippines'),
            VietnamBillingAddressForm: () => import('./billingForm/Vietnam'),

            MalaysiaDeliveryAddressForm: () => import('./deliveryForm/Malaysia'),
            CambodiaDeliveryAddressForm: () => import('./deliveryForm/Cambodia'),
            SingaporeDeliveryAddressForm: () => import('./deliveryForm/Singapore'),
            IndonesiaDeliveryAddressForm: () => import('./deliveryForm/Indonesia'),
            ThailandDeliveryAddressForm: () => import('./deliveryForm/Thailand'),
            HongKongDeliveryAddressForm: () => import('./deliveryForm/HongKong'),
            PhilippinesDeliveryAddressForm: () => import('./deliveryForm/Philippines'),
            VietnamDeliveryAddressForm: () => import('./deliveryForm/Vietnam'),

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
                let type = startCase(this.type);
                let country = startCase(this.country);
                
                if (this.country.match(/\s/g)) {
                    let split = this.country.split(' ');
                    return `${split[0]}${split[1]}${type}AddressForm`;
                }
                
                return `${country}${type}AddressForm`;
            }
        },
        render(createElement, context) {
            return createElement("keep-alive", [
                createElement("component", {
                    is: this.component,
                    props: this.$props
                })
            ]);
        }
    };
</script>