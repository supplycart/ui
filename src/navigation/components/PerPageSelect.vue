<template>
    <div class="perpage text-right ml-1">
        <div class="inline-block dropdown relative">
            <select
                v-model="limit"
                class="selections"
                style="padding-right: 1.2rem; padding-left: 0.5rem"
                @change="$emit('change')"
            >
                <option value="15">Per Page 15</option>
                <option value="30">Per Page 30</option>
                <option value="50">Per Page 50</option>
                <option value="100">Per Page 100</option>
            </select>
            <div class="pointer" style="padding-right: 0.2rem">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chevron-down"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
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
