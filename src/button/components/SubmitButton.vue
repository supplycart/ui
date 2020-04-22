<template>
  <button
    :type="type"
    :disabled="isDisabled"
    @click="submit()"
  >
    <div
      v-if="loading"
      id="btn-loader"
      class="loader"
    >
      <span />
      <span />
      <span />
    </div>
    <span>{{ title }}</span>
  </button>
</template>
<style>
    .loader{
        display: inline-block;
        width: 25px;
        height: 10px;
        border-radius: 100%;
        position: relative;
        margin: 0 auto;
        margin-right: 5px;
    }

    #btn-loader span{
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 100%;
        background-color: #3498db;
        margin: 0px 0px;
        opacity: 0;
    }

    #btn-loader span:nth-child(1){
        animation: opacitychange 1s ease-in-out infinite;
    }

    #btn-loader span:nth-child(2){
        animation: opacitychange 1s ease-in-out 0.33s infinite;
    }

    #btn-loader span:nth-child(3){
        animation: opacitychange 1s ease-in-out 0.66s infinite;
    }

    @keyframes opacitychange{
        0%, 100%{
            opacity: 0;
        }

        60%{
            opacity: 1;
        }
    }
</style>
<script>

export default {
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: 'Submit'
        },
        type:  {
            type: String,
            default: 'button'
        },
    },
    computed: {
        isDisabled() {
            return this.disabled || this.loading;
        }
    },
    methods: {
        submit() {
            if (!this.isDisabled) this.$emit('submit');
        }
    }
}
</script>
