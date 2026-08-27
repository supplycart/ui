<script setup>
import { useAddress } from "../composables/useAddress.js";

// Define props
const props = defineProps({
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
});

// Use address composable
const { addressCountryConfig } = useAddress(props);

// Values (same as original)
const value = props.modelValue;
// Define component options
defineOptions({
    name: "GeneralAddress",
});
</script>

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
