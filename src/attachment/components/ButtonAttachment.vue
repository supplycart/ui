<template>
    <BaseAttachment
        v-model="input"
        @change="change"
        @deleted="deleted"
        @onError="onError"
    >
        <label
            slot-scope="{ setAttachment }"
            class="cursor-pointer inline-block flex justify-center fit-width"
            :for="id"
        >
            <slot name="icon">
                <FeatherIcon
                    :name="icon"
                    class="inline-block mx-1"
                    :size="15"
                />
            </slot>
            <input
                :id="id"
                type="file"
                class="hidden"
                @change="setAttachment"
            />
            <slot>
                <div class="mr-1" v-if="label != ''">{{ label }}</div>
            </slot>
        </label>
    </BaseAttachment>
</template>
<script>
import BaseAttachment from "./BaseAttachment.vue";
import FeatherIcon from "../../icon/components/FeatherIcon.vue";

export default {
    components: {
        BaseAttachment,
        FeatherIcon,
    },
    props: {
        id: {
            type: String,
            default: "button-attachment",
        },
        value: {
            type: Array,
            default: () => [],
        },
        label: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            default: "",
        },
    },
    computed: {
        input: {
            set(val) {
                this.$emit("input", val);
            },
            get() {
                return this.value;
            },
        },
    },
    methods: {
        change(val) {
            this.$emit("change", val);
        },
        deleted(val) {
            this.$emit("deleted", val);
        },
        onError(val) {
            this.$emit("onError", val);
        },
    },
};
</script>
<style scoped>
.fit-width {
    width: fit-content;
}
</style>
