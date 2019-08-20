<template>
  <div id="container">
    <List id="lists" :items="lists"></List>
  </div>
</template>

<script>
import List from '../List.vue'

export default {
  name : 'MultiTodoList',
  components: {
    List
  },
  methods: {
      fetchData() {
          this.$http.get("http://localhost:3000/lists/").then(response => {
                this.lists = response.data;
          })
      }
  },
  created() {
    this.fetchData();
  },
  data() { 
    return {
      lists : []
    }
  }
}
</script>

<style>
#container {
    margin: 0 auto;
    max-width: 400px;
    border: 1px solid #3f3f3f;
    overflow: hidden;
}
</style>
