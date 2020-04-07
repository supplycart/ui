<template>
    <div :v-bind="$attrs">
        <slot :time="localTime">{{ localTime }}</slot>
    </div>
</template>
<script>
    import moment from 'moment-timezone';

    export default {
        inheritAttrs: false,
        props: {
            value: {
                type: String | Date,
                default: null,
                required: true
            },
            timezone: {
                type: String,
                default: null,
                required: true
            },
            format: {
                type: String,
                default: 'YYYY-MM-DD HH:mm:ss'
            }
        },
        computed: {
            localTime() {
                // set default timezone as UTC
                moment.tz.setDefault('Etc/UTC');

                // convert value into timezone local time
                return moment(this.value).tz(this.timezone).format(this.format);
            }
        }

    }
</script>
