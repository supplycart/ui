<template>
  <div>
    <slot name="label">
      <label
        v-if="label"
        :for="$attrs.id"
      >
        {{ label }}
        <small
          v-if="required"
          class="italic text-red-600"
        >*</small>
      </label>
    </slot>

    <BaseAttachment
      v-model="input"
      @change="change"
    >
      <div
        slot-scope="{ setAttachment }"
        class="cursor-pointer"
      >
        <label
          for="service_attachment"
          class="cursor-pointer"
        >
          <input
            id="service_attachment"
            type="file"
            class="hidden"
            @change="setAttachment"
          >
          <div
            class="w-full"
          >
            <span>Click to Attach Document</span>
            <FeatherIcon
              name="paperclip"
              class="svg-15 ml-2"
            />
          </div>
        </label>
      </div>
    </BaseAttachment>

    <slot name="error" />
    <slot name="description" />
  </div>
</template>
<script>
import BaseAttachment from "./BaseAttachment";

export default {
  components: {BaseAttachment},
  props: {
    value: {
      type: Array,
      default: () => []
    },
    format: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: null
    }
  },
  computed: {
    input: {
      set(val) {
        this.$emit("input", val);
      },
      get() {
        return this.value;
      }
    }
  },
  methods: {
    change(val) {
      this.$emit("change", val);
    }
  }
};
</script>