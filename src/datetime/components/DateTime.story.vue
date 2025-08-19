<script>
export default {
  title: 'DateTime',
}
</script>

<template>
  <Story
    title="DateTime"
    :layout="{ type: 'grid', width: '50%' }"
  >
    <Variant
      title="Basic Usage"
      :init-state="() => ({ 
        value: new Date().toISOString(),
        timezone: 'Asia/Kuala_Lumpur',
        format: 'YYYY-MM-DD HH:mm:ss',
        isUtc: false 
      })"
    >
      <template #default="{ state }">
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-4">DateTime Component</h3>
          <p class="mb-2"><strong>Input:</strong> {{ state.value }}</p>
          
          <DateTime
            :value="state.value"
            :timezone="state.timezone"
            :format="state.format"
            :is-utc="state.isUtc"
          />
          
          <div class="mt-4 space-y-2">
            <label class="block">
              <span class="text-sm font-medium">Timezone:</span>
              <select v-model="state.timezone" class="ml-2 border rounded px-2 py-1">
                <option value="Asia/Kuala_Lumpur">Asia/Kuala_Lumpur</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
            </label>
            
            <label class="block">
              <span class="text-sm font-medium">Format:</span>
              <select v-model="state.format" class="ml-2 border rounded px-2 py-1">
                <option value="YYYY-MM-DD HH:mm:ss">YYYY-MM-DD HH:mm:ss</option>
                <option value="DD/MM/YYYY HH:mm">DD/MM/YYYY HH:mm</option>
                <option value="MMM DD, YYYY h:mm A">MMM DD, YYYY h:mm A</option>
              </select>
            </label>
            
            <label class="block">
              <input type="checkbox" v-model="state.isUtc" class="mr-2">
              <span class="text-sm font-medium">Show UTC format</span>
            </label>
          </div>
        </div>
      </template>
    </Variant>

    <Variant
      title="With Custom Slot"
      :init-state="() => ({ 
        value: new Date().toISOString(),
        timezone: 'Asia/Kuala_Lumpur' 
      })"
    >
      <template #default="{ state }">
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-4">DateTime with Custom Slot</h3>
          
          <DateTime
            :value="state.value"
            :timezone="state.timezone"
          >
            <template #default="{ time }">
              <div class="bg-blue-50 border-l-4 border-blue-400 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-blue-700">
                      Current time: <strong>{{ time }}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </DateTime>
        </div>
      </template>
    </Variant>
  </Story>
</template>

<docs lang="md">
# DateTime Component

A Vue component for displaying formatted date and time with timezone support.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | String | `null` | **Required.** The datetime value (ISO string or date string) |
| `timezone` | String | `"Asia/Kuala_Lumpur"` | The timezone to display the time in |
| `format` | String | `"YYYY-MM-DD HH:mm:ss"` | Moment.js format string for displaying the time |
| `isUtc` | Boolean | `false` | Whether to display in UTC format with timezone offset |

## Slots

| Name | Description | Scope |
|------|-------------|-------|
| `default` | Custom display template | `{ time }` - The formatted time string |

## Usage

```vue
<template>
  <DateTime
    :value="new Date().toISOString()"
    timezone="Asia/Tokyo"
    format="DD/MM/YYYY HH:mm"
  />
</template>
```

## With Custom Slot

```vue
<template>
  <DateTime :value="dateValue">
    <template #default="{ time }">
      <span class="custom-time">🕐 {{ time }}</span>
    </template>
  </DateTime>
</template>
```
</docs>