# DateTime Components

Date and time picker components with timezone support and flexible configuration.

## Overview

The DateTime module provides comprehensive date/time handling components:

- **DatePicker**: Single date selection with Flatpickr integration
- **DateRangePicker**: Date range selection with validation
- **TimePicker**: Time selection component
- **DateTime**: Date/time display component with formatting

## Common Features

- Timezone support with Moment.js
- Customizable date formats
- Accessibility compliance
- Vue 2.7 reactive patterns
- Integration with Flatpickr for rich UI

## Usage Examples

### Basic Date Picker

```vue
<template>
  <DatePicker
    v-model="selectedDate"
    label="Select Date"
    :timezone="'Asia/Kuala_Lumpur'"
  />
</template>
```

### Date Range Selection

```vue
<template>
  <DateRangePicker
    v-model="dateRange"
    :config="{ minDate: 'today' }"
  />
</template>
```