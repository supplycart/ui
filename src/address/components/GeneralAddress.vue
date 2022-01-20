<template>
    <div>
        <div>
            <p>
                <span v-if="value.unit">{{ value.unit }}, </span>
                <span v-if="value.floor">{{ value.floor }}, </span>
                <span v-if="value.building">{{ value.building }}</span>
            </p>
            <p>{{ value.street }}</p>
            <p>
                {{ value.city }}{{ value.city && value.postcode ? "," : "" }}
                {{ value.postcode }}
            </p>
            <p>
                {{ value.state }}{{ value.state && value.country ? "," : "" }}
                {{ value.country }}
            </p>
        </div>
    </div>
</template>

<script>
import AddressMixins from "../mixins/addressNew";
export default {
    name: "GeneralAddress",
    mixins: [AddressMixins],
};
</script>
