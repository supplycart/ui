<template>
    <div>
        <div>
            <p>
                <span v-if="value.unit && addressCountryConfig.unit"
                    >{{ value.unit }},
                </span>
                <span v-if="value.floor && addressCountryConfig.floor"
                    >{{ value.floor }},
                </span>
                <span v-if="value.building && addressCountryConfig.building">{{
                    value.building
                }}</span>
            </p>
            <p v-if="addressCountryConfig.street">{{ value.street }}</p>
            <p>
                <span
                    v-if="
                        addressCountryConfig.city ||
                        addressCountryConfig.district
                    "
                >
                    {{ value.city
                    }}{{ value.city && value.postcode ? "," : "" }}
                </span>
                <span
                    v-if="
                        addressCountryConfig.postcode ||
                        addressCountryConfig.zipcode
                    "
                >
                    {{ value.postcode }}
                </span>
            </p>
            <p>
                <span v-if="addressCountryConfig.state">
                    {{ value.state
                    }}{{ value.state && value.country ? "," : "" }}
                </span>
                {{ value.country }}
            </p>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { useAddress } from "../composables/useAddress";

export default defineComponent({
    name: "GeneralAddress",
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
