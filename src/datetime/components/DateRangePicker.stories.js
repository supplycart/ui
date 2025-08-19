import DateRangePicker from './DateRangePicker.vue';

export default {
  title: 'DateTime/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  args: {
    modelValue: null,
    disabled: false,
    dateFormat: 'yyyy-MM-dd',
  },
};

export const WithInitialRange = {
  args: {
    modelValue: [new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)],
    disabled: false,
    dateFormat: 'yyyy-MM-dd',
  },
};

export const Disabled = {
  args: {
    modelValue: [new Date(), new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)],
    disabled: true,
    dateFormat: 'yyyy-MM-dd',
  },
};

export const WithCustomFormat = {
  args: {
    modelValue: null,
    disabled: false,
    dateFormat: 'dd/MM/yyyy',
  },
};

export const WithRestrictions = {
  args: {
    modelValue: null,
    disabled: false,
    dateFormat: 'yyyy-MM-dd',
    config: {
      minDate: new Date(),
      maxDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    },
  },
};