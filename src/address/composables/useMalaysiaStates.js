import { ref } from "vue";

export function useMalaysiaStates() {
    const states = ref([
        "Johor",
        "Kedah",
        "Kelantan",
        "Kuala Lumpur",
        "Labuan",
        "Melaka",
        "Negeri Sembilan",
        "Pahang",
        "Penang",
        "Perak",
        "Perlis",
        "Putrajaya",
        "Sabah",
        "Sarawak",
        "Selangor",
        "Terengganu",
    ]);

    return {
        states,
    };
}
