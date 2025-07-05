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
                <span v-if="addressCountry == 'SINGAPORE'">
                    {{ value.street }}</span
                >
                <span
                    v-if="
                        value.unit &&
                        addressCountryConfig.unit &&
                        addressCountry !== 'SINGAPORE'
                    "
                    >{{ value.unit }},
                </span>
                <span v-if="value.floor && addressCountryConfig.floor"
                    >{{ value.floor }},
                </span>
                <span
                    v-if="
                        value.unit &&
                        addressCountryConfig.unit &&
                        addressCountry == 'SINGAPORE'
                    "
                    >{{ value.unit }},
                </span>
                <span v-if="value.building && addressCountryConfig.building">{{
                    value.building
                }}</span>
                <span
                    v-if="
                        addressCountryConfig.street &&
                        addressCountry !== 'SINGAPORE'
                    "
                >
                    {{ value.street }}
                </span>
                <span
                    v-if="
                        addressCountryConfig.city ||
                        addressCountryConfig.district
                    "
                >
                    {{ value.city
                    }}{{ value.city && value.postcode ? "," : "" }}
                </span>
            </p>
            <p>
                <span
                    v-if="
                        addressCountryConfig.postcode ||
                        addressCountryConfig.zipcode
                    "
                >
                    {{ value.postcode }}
                </span>

                <span
                    v-if="
                        addressCountryConfig.state ||
                        addressCountryConfig.province
                    "
                >
                    {{ value.state
                    }}{{ value.state && value.country ? "," : "" }}
                </span>
                {{ value.country }}
            </p>
        </div>
        <div>
            <div v-if="showAttribute('lift_access') && display.length > 0">
                <p v-if="value.lift_access">Lift Access</p>
            </div>
            <div v-if="!display.length">
                <p>Lift Access: {{ value.lift_access }}</p>
            </div>
        </div>

        <div>
            <div
                v-if="
                    showAttribute('requires_permit') && display.length > 0
                "
            >
                <p v-if="value.requires_permit">Requires Permit</p>
            </div>
            <div v-if="!display.length">
                <p>Requires Permit: {{ value.requires_permit }}</p>
            </div>
            <div v-if="showAttribute('warehouse')">
                <p v-if="value.warehouse">Warehouse</p>
            </div>
        </div>
        <div v-if="showAttribute('ref_no')">
            <p v-if="value.ref_no">Location Code: {{ value.ref_no }}</p>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { useAddress } from "../composables/useAddress";

export default defineComponent({
    name: "DeliveryAddress",
    props: {
        modelValue: {
            type: [Array, Object],
            default: () => ({}),
        },
        display: {
            type: Array,
            default: () => [],
        },
        country: {
            type: String,
            default: "Malaysia",
        },
    },
    setup(props) {
        const { LABELS, addressCountry, addressCountryConfig, showAttribute } = useAddress(props);

        return {
            value: props.modelValue,
            display: props.display,
            LABELS,
            addressCountry,
            addressCountryConfig,
            showAttribute,
        };
    },
});
</script>
