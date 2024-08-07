<template>
    <div class="paginate flex">
        <slot v-if="showPerPage" name="default" :pagination="pagination">
            <PerPageSelect v-model="perPage" @change="goToPage(1)" />
        </slot>
        <div class="w-full flex md:flex-1 items-center justify-end">
            <div v-if="showItemInterval">
                {{ toFullNumber(pagination.from || 0) }} -
                {{ toFullNumber(pagination.to || 0) }} of
                {{ toFullNumber(pagination.total) }}
            </div>
            <div class="btn-group ml-2">
                <button
                    :disabled="pagination.current_page === 1"
                    class="btn btn-default"
                    style="font-size: 0.75rem"
                    type="button"
                    @click="goToPage(1)"
                >
                    First
                </button>

                <button
                    v-for="page in pages"
                    :key="page"
                    :class="[selected === page ? 'active' : '']"
                    class="btn btn-default"
                    style="font-size: 0.75rem"
                    type="button"
                    @click="goToPage(page)"
                >
                    {{ page }}
                </button>

                <button
                    :disabled="pagination.current_page === pagination.last_page"
                    class="btn btn-default"
                    style="font-size: 0.75rem"
                    type="button"
                    @click="goToPage(pagination.last_page)"
                >
                    Last
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import PerPageSelect from "./PerPageSelect.vue";

export default {
    components: { PerPageSelect },
    props: {
        value: {
            type: Object,
            default: () => ({}),
        },
        showItemInterval: {
            type: Boolean,
            default: true,
        },
        showPerPage: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            pages: [],
            selected: 1,
            range: 3,
            perPage: 30,
        };
    },
    computed: {
        pagination: {
            get() {
                return this.value;
            },
            set(value) {},
        },
    },
    watch: {
        pagination: {
            handler(value) {
                this.perPage = value.per_page;
                this.selected = value.current_page;

                this.checkPages();
            },
            deep: true,
            immediate: true,
        },
    },
    mounted() {
        this.checkPages();
    },
    methods: {
        checkPages() {
            const pages = [];

            const min = this.selected - this.range;
            const max = this.selected + this.range;

            for (let i = min + 1; i < max; i++) {
                if (i > 0 && i <= this.pagination.last_page) {
                    pages.push(i);
                }
            }

            this.pages = pages;
        },
        goToPage(page) {
            this.$emit("change", {
                page,
                perPage: this.perPage,
            });
        },
        toFullNumber(value) {
            if (value === undefined || value === null) {
                return 0;
            }
            value = parseInt(value, 10);
            return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        },
    },
};
</script>
