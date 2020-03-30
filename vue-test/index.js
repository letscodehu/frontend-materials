import Vue from 'vue';
import Spotlight from 'vue-spotlight';
new Vue({
    el : '#app', 
    data() {
        return {
            open:true
        }
    },
    methods : {
        toggle() {
            this.open = !this.open
        }
    },
    components: {
        Spotlight
    }
})
