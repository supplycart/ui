<template>
    <div id="app" class="flex-1">
        <div class="text-center my-8">
            <img alt="Vue logo" src="./assets/logo.png" class="mx-auto w-24 mb-3">
            <h1 class="text-xl font-bold">Supplycart UI - Test</h1>
        </div>
        <div class="p-12">
            <h2 class="mb-2 font-bold text-gray-600">Basic Test</h2>
            <p>This is a simple test to verify Vue.js 3 is working correctly.</p>
            <p>Counter: {{ counter }}</p>
            <button @click="increment" class="bg-blue-500 text-white px-4 py-2 rounded">
                Increment
            </button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: "AppTest",
    setup() {
        const counter = ref(0)
        
        const increment = () => {
            counter.value++
        }
        
        return {
            counter,
            increment
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>