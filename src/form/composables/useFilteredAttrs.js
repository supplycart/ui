import { computed, useAttrs } from "vue";

/**
 * Composable to properly handle $attrs in Vue 3
 * Separates class, style, and event handlers from other attributes
 * This ensures compatibility with Vue 3's new $attrs behavior
 */
export function useFilteredAttrs() {
    const attrs = useAttrs();

    // Extract class and style from attrs to handle separately
    const filteredAttrs = computed(() => {
        const { class: _, style: __, ...rest } = attrs;

        // Filter out event handlers (onXxx) to prevent duplication
        const filtered = {};
        for (const [key, value] of Object.entries(rest)) {
            if (!key.startsWith("on")) {
                filtered[key] = value;
            }
        }

        return filtered;
    });

    // Extract only class from attrs
    const attrsClass = computed(() => attrs.class);

    // Extract only style from attrs
    const attrsStyle = computed(() => attrs.style);

    // Extract event handlers from attrs
    const attrsListeners = computed(() => {
        const listeners = {};
        for (const [key, value] of Object.entries(attrs)) {
            if (key.startsWith("on") && typeof value === "function") {
                listeners[key] = value;
            }
        }
        return listeners;
    });

    return {
        filteredAttrs,
        attrsClass,
        attrsStyle,
        attrsListeners,
        attrs,
    };
}
