<script>
export default {
  title: 'DatePicker',
}
</script>

<template>
  <Story
    title="DatePicker"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant
      title="Basic Usage"
      :init-state="() => ({ 
        value: null,
        label: 'Select Date',
        required: false,
        disabled: false
      })"
    >
      <template #default="{ state }">
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-4">DatePicker Component</h3>
          
          <DatePicker
            :id="'date-picker-basic'"
            :label="state.label"
            v-model="state.value"
            :required="state.required"
            :disabled="state.disabled"
          />
          
          <div class="mt-4 p-3 bg-gray-50 rounded">
            <strong>Selected Value:</strong> {{ state.value || 'None' }}
          </div>
          
          <div class="mt-4 space-y-2">
            <label class="block">
              <span class="text-sm font-medium">Label:</span>
              <input v-model="state.label" class="ml-2 border rounded px-2 py-1" />
            </label>
            
            <label class="block">
              <input type="checkbox" v-model="state.required" class="mr-2">
              <span class="text-sm font-medium">Required</span>
            </label>
            
            <label class="block">
              <input type="checkbox" v-model="state.disabled" class="mr-2">
              <span class="text-sm font-medium">Disabled</span>
            </label>
          </div>
        </div>
      </template>
    </Variant>

    <Variant
      title="With Custom Configuration"
      :init-state="() => ({ 
        value: null,
        minDate: 'today',
        maxDate: null,
        enableTime: false,
        dateFormat: 'Y-m-d'
      })"
    >
      <template #default="{ state }">
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-4">DatePicker with Custom Config</h3>
          
          <DatePicker
            id="date-picker-custom"
            label="Custom Date Picker"
            v-model="state.value"
            :config="{
              minDate: state.minDate,
              maxDate: state.maxDate,
              enableTime: state.enableTime,
              dateFormat: state.dateFormat
            }"
          />
          
          <div class="mt-4 p-3 bg-gray-50 rounded">
            <strong>Selected Value:</strong> {{ state.value || 'None' }}
          </div>
          
          <div class="mt-4 space-y-2">
            <label class="block">
              <span class="text-sm font-medium">Min Date:</span>
              <select v-model="state.minDate" class="ml-2 border rounded px-2 py-1">
                <option :value="null">None</option>
                <option value="today">Today</option>
                <option :value="new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)">Next Week</option>
              </select>
            </label>
            
            <label class="block">
              <span class="text-sm font-medium">Date Format:</span>
              <select v-model="state.dateFormat" class="ml-2 border rounded px-2 py-1">
                <option value="Y-m-d">Y-m-d (2023-12-31)</option>
                <option value="d/m/Y">d/m/Y (31/12/2023)</option>
                <option value="F j, Y">F j, Y (December 31, 2023)</option>
              </select>
            </label>
            
            <label class="block">
              <input type="checkbox" v-model="state.enableTime" class="mr-2">
              <span class="text-sm font-medium">Enable Time</span>
            </label>
          </div>
        </div>
      </template>
    </Variant>

    <Variant
      title="Different Timezones"
      :init-state="() => ({ 
        value: null,
        timezone: 'Asia/Kuala_Lumpur'
      })"
    >
      <template #default="{ state }">
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-4">DatePicker with Different Timezones</h3>
          
          <DatePicker
            id="date-picker-timezone"
            label="Date with Timezone"
            v-model="state.value"
            :timezone="state.timezone"
          />
          
          <div class="mt-4 p-3 bg-gray-50 rounded">
            <strong>Selected Value:</strong> {{ state.value || 'None' }}<br>
            <strong>Timezone:</strong> {{ state.timezone }}
          </div>
          
          <div class="mt-4">
            <label class="block">
              <span class="text-sm font-medium">Timezone:</span>
              <select v-model="state.timezone" class="ml-2 border rounded px-2 py-1">
                <option value="Asia/Kuala_Lumpur">Asia/Kuala_Lumpur</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
            </label>
          </div>
        </div>
      </template>
    </Variant>
  </Story>
</template>

<docs lang="md">
# DatePicker Component

A Vue component wrapper around Flatpickr for date selection with timezone support.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | String | `null` | HTML id attribute for the input |
| `label` | String | `null` | Label text to display above the picker |
| `labelClass` | String | `"inline-block mb-2"` | CSS classes for the label |
| `value` | String \| Date | `null` | The selected date value |
| `timezone` | String \| Object | `Asia/Kuala_Lumpur` | Timezone for date handling |
| `config` | Object | `{}` | Custom Flatpickr configuration options |
| `disabled` | Boolean | `false` | Whether the picker is disabled |
| `required` | Boolean | `false` | Whether the field is required |

## Events

| Name | Payload | Description |
|------|---------|-------------|
| `input` | `Date \| String` | Emitted when the date value changes |

## Usage

```vue
<template>
  <DatePicker
    id="my-date-picker"
    label="Select Date"
    v-model="selectedDate"
    :config="{
      minDate: 'today',
      dateFormat: 'Y-m-d'
    }"
  />
</template>
```

## Configuration Options

The `config` prop accepts any Flatpickr configuration options:

- `minDate` - Minimum selectable date
- `maxDate` - Maximum selectable date  
- `dateFormat` - Display format for the date
- `enableTime` - Enable time selection
- `mode` - Selection mode ('single', 'multiple', 'range')

For full configuration options, see the [Flatpickr documentation](https://flatpickr.js.org/options/).
</docs>