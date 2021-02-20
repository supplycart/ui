<template>
    <div class="perpage text-right ml-2">
        <div class="inline-block dropdown relative">
            <select
                v-model="limit"
                class="selections w-auto"
                @change="$emit('change')"
            >
                <option value="30">Per Page 30</option>
                <option value="50">Per Page 50</option>
                <option value="100">Per Page 100</option>
            </select>
            <div class="pointer">
                <FeatherIcon name="chevron-down" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: [Number, String],
            default: 30,
        },
    },
    computed: {
        limit: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            },
        },
    },
};
</script>
