<template>
    <div class="flex">
        <slot name="default" :pagination="pagination">
            <PerPageSelect v-model="perPage" @change="goToPage(1)"/>
        </slot>
        <div class="w-full flex md:flex-1 items-center justify-end">
            <div v-if="showItemInterval">
                {{ pagination.from || 0 | toFullNumber }} - {{ pagination.to || 0 | toFullNumber }} of {{
                pagination.total | toFullNumber }}
            </div>
            <div class="btn-group ml-4">
                <button
                    :disabled="pagination.current_page === 1"
                    class="btn btn-default"
                    type="button"
                    @click="goToPage(1)">
                    First
                </button>

                <button
                    v-for="page in pages"
                    :key="page"
                    :class="[ selected === page ? 'active' : '' ]"
                    class="btn btn-default"
                    type="button"
                    @click="goToPage(page)">
                    {{ page }}
                </button>

                <button
                    :disabled="pagination.current_page === pagination.last_page"
                    class="btn btn-default"
                    type="button"
                    @click="goToPage(pagination.last_page)">
                    Last
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import PerPageSelect from "@/components/navigation/PerPageSelect";

    export default {
        components: {PerPageSelect},
        props: {
            value: {
                type: Object,
                default: () => ({})
            },
            showItemInterval: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                pages: [],
                selected: 1,
                range: 3,
                perPage: 30
            };
        },
        computed: {
            pagination: {
                get() {
                    return this.value;
                },
                set(value) {

                }
            }
        },
        watch: {
            pagination: {
                handler(value) {
                    this.perPage = value.per_page;
                    this.selected = value.current_page;

                    this.checkPages();
                },
                deep: true
            }
        },
        methods: {
            checkPages() {
                let pages = [];

                let min = this.selected - this.range;
                let max = this.selected + this.range;

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
                    perPage: this.perPage
                });
            }
        },
        mounted() {
            this.checkPages();
        }
    };
</script>
