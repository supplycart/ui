<script setup>
import { ref, computed, watch, onMounted } from "vue";
import PerPageSelect from "./PerPageSelect.vue";

const props = defineProps({
    modelValue: {
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
});

const emit = defineEmits(["update:modelValue", "change"]);

const pages = ref([]);
const selected = ref(1);
const range = ref(3);
const perPage = ref(30);

const pagination = computed(() => {
    return props.modelValue || {};
});

const checkPages = () => {
    const pagesArray = [];
    const min = selected.value - range.value;
    const max = selected.value + range.value;

    for (let i = min + 1; i < max; i++) {
        if (i > 0 && i <= pagination.value.last_page) {
            pagesArray.push(i);
        }
    }

    pages.value = pagesArray;
};

const updatePerPage = (value) => {
    perPage.value = value;
};

const goToPage = (page) => {
    emit("change", {
        page,
        perPage: perPage.value,
    });
};

const toFullNumber = (value) => {
    if (value === undefined || value === null) {
        return 0;
    }
    value = parseInt(value, 10);
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

watch(
    pagination,
    (value) => {
        if (value.per_page) {
            perPage.value = value.per_page;
        }
        if (value.current_page) {
            selected.value = value.current_page;
        }
        checkPages();
    },
    { deep: true, immediate: true },
);

onMounted(() => {
    checkPages();
});
</script>

<template>
    <div class="paginate flex">
        <slot v-if="showPerPage" name="default" :pagination="pagination">
            <PerPageSelect
                :model-value="perPage"
                @update:model-value="updatePerPage"
                @change="goToPage(1)"
            />
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
