import TimePicker from './TimePicker.vue';

export default {
  title: 'DateTime/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  args: {
    modelValue: null,
    disabled: false,
    timeFormat: 'HH:mm',
  },
};

export const WithInitialTime = {
  args: {
    modelValue: '14:30',
    disabled: false,
    timeFormat: 'HH:mm',
  },
};

export const Disabled = {
  args: {
    modelValue: '09:00',
    disabled: true,
    timeFormat: 'HH:mm',
  },
};

export const WithSeconds = {
  args: {
    modelValue: null,
    disabled: false,
    timeFormat: 'HH:mm:ss',
  },
};

export const TwelveHourFormat = {
  args: {
    modelValue: null,
    disabled: false,
    timeFormat: 'h:mm a',
  },
};