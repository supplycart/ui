import DatePicker from './DatePicker.vue';

export default {
  title: 'DateTime/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    label: 'Select Date',
    modelValue: null,
    disabled: false,
    required: false,
    dateFormat: 'yyyy-MM-dd',
  },
};

export const WithLabel = {
  args: {
    label: 'Pick your date',
    modelValue: new Date(),
    disabled: false,
    required: true,
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Date Picker',
    modelValue: null,
    disabled: true,
    required: false,
  },
};

export const Required = {
  args: {
    label: 'Required Date Field',
    modelValue: null,
    disabled: false,
    required: true,
  },
};

export const WithMinMaxDates = {
  args: {
    label: 'Date with Restrictions',
    modelValue: null,
    disabled: false,
    required: false,
    config: {
      minDate: new Date(),
      maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  },
};