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
import AddressMixins from "../mixins/address";
export default {
    name: "GeneralAddress",
    mixins: [AddressMixins],
};
</script>
