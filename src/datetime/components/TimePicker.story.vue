<script>
export default {
  title: 'TimePicker',
}
</script>

<template>
  <Story
    title="TimePicker"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant
      title="Basic Time Picker"
      :init-state="() => ({ 
        value: null,
        label: 'Select Time'
      })"
    >
      <template #default="{ state }">
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-4">TimePicker Component</h3>
          
          <TimePicker
            id="time-picker-basic"
            :label="state.label"
            v-model="state.value"
          />
          
          <div class="mt-4 p-3 bg-gray-50 rounded">
            <strong>Selected Value:</strong> {{ state.value || 'None' }}
          </div>
        </div>
      </template>
    </Variant>
  </Story>
</template>

<docs lang="md">
# TimePicker Component

A Vue component for time selection using Flatpickr.

## Props

Similar to DatePicker but configured specifically for time selection.

## Usage

```vue
<template>
  <TimePicker
    id="my-time-picker"
    label="Select Time"
    v-model="selectedTime"
  />
</template>
```
</docs>