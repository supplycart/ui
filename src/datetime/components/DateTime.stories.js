import DateTime from './DateTime.vue';

export default {
  title: 'DateTime/DateTime',
  component: DateTime,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  args: {
    value: new Date().toISOString(),
    timezone: 'Asia/Kuala_Lumpur',
    format: 'YYYY-MM-DD HH:mm:ss',
    isUtc: false,
  },
};

export const WithDifferentTimezone = {
  args: {
    value: new Date().toISOString(),
    timezone: 'America/New_York',
    format: 'YYYY-MM-DD HH:mm:ss',
    isUtc: false,
  },
};

export const WithCustomFormat = {
  args: {
    value: new Date().toISOString(),
    timezone: 'Asia/Kuala_Lumpur',
    format: 'dddd, MMMM Do YYYY, h:mm:ss a',
    isUtc: false,
  },
};

export const UTCFormat = {
  args: {
    value: new Date().toISOString(),
    timezone: 'Asia/Tokyo',
    format: 'YYYY-MM-DD HH:mm:ss',
    isUtc: true,
  },
};

export const WithCustomSlot = {
  args: {
    value: new Date().toISOString(),
    timezone: 'Europe/London',
    format: 'HH:mm:ss',
    isUtc: false,
  },
  render: (args) => ({
    components: { DateTime },
    setup() {
      return { args };
    },
    template: `
      <DateTime v-bind="args">
        <template #default="{ time }">
          <div style="padding: 12px; background: #f0f8ff; border-radius: 8px; border-left: 4px solid #1890ff;">
            <strong>🕐 Current Time:</strong> {{ time }}
          </div>
        </template>
      </DateTime>
    `,
  }),
};