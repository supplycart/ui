<template>
  <div class="row-full pagination-header">
    <div class="w-full flex flex-1 items-center justify-between">
      <div>
        <span v-if="showWording">Showing {{ from || 0 }} to {{ to || 0 }} <span v-if="total">out of {{ total }}</span></span>
      </div>
      <div class="btn-group ml-4">
        <button
          :disabled="current_page == 1"
          :class="btnClass"
          class="btn btn-default"
          type="button"
          @click="nextPage(1)"
        >
          First
        </button>

        <button 
          v-for="(btn,index) in pages"
          :key="index+'b'"
          :class="[ selected == btn ? 'active' : '', btnClass ]"
          class="btn btn-default"
          type="button"
          @click="nextPage(btn)"
        >
          {{ btn }}
        </button>

        <button
          v-if="total"
          :disabled="current_page == last_page"
          :class="btnClass"
          class="btn btn-default"
          type="button"
          @click="nextPage(last_page)"
        >
          Last
        </button>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        props: {
            total: {
                type: Number,
                default: 0
            },
            last_page: {
                type: Number,
                default: 1
            },
            from: {
                type: Number,
                default: 0
            },
            to: {
                type: Number,
                default: 0
            },
            showWording : {
                type: Boolean,
                default: true
            },
            current_page: {  
                type: Number,
                default: 1
            },
            btnClass: {
                type: String,
                default: null
            }
        },
        data() {
            return {
                pages: [],
                selected: 1,
                range: 2
            }
        },
        watch: {
            current_page: function() {
                this.checkPages();
                this.checkMin();
                this.checkMax();
            },
            last_page: function() {
                this.checkPages();
                this.checkMin();
                this.checkMax();
            },
        },
        mounted() {
            this.checkPages();
        },
        methods: {
            checkPages() {
                this.pages = [];
                this.selected = this.current_page;

                if(this.last_page < this.range + 1) {
                    for(let a=0; a<this.last_page; a++) {
                        this.pages.push(a+1);
                    }
                }
                else {
                    for(let a=0; a<this.current_page + this.range; a++) {
                        this.pages.push(a+1);
                    }
                }
            },
            nextPage(page) {
                this.$emit("nextPage", page);
            },
            checkMin() {
                let temp = this.pages.findIndex(item => item == this.current_page - this.range);
                temp > -1 ? this.pages.splice(0, temp) : '';
            },
            checkMax() {
                let temp = this.pages.findIndex(item => item > this.last_page);
                let range = (this.pages.length-1)-temp;
                temp > -1 ? this.pages.splice(temp, this.pages.length-1) : '';
            }
        },
    };
</script>