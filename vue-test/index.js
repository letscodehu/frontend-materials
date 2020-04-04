import Vue from 'vue';
import Spotlight from 'vue-spotlight';
new Vue({
    el : '#app', 
    data() {
        return {
            open : true,
            dataProvider: (term) => fetch(
                "http://localhost:3000/stocks?symbol_like=" + term
            ).then(
                 r => r.json()
            ),
            matchRenderer: (item, fieldName) => {
                return `<img class="hit-result-image" src="https://picsum.photos/22"/><span>${item[fieldName]} - ${item.price}</span>`
            }
        }
    },
    components: {
        Spotlight
    }
})
