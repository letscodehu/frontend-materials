<template>
 <div id="container">
    <div class="input-container">
        <input type="text" placeholder="Add a new task!" v-model="taskName"/>
        <button v-on:click="addTask">Add</button>
    </div>
    <List id="tasks" :items="tasks" v-on:delete="deleteTask"></List>
    <SnackBar :notification="message"></SnackBar>
</div>
</template>

<script>
import SnackBar from '../SnackBar.vue'
import List from '../List.vue'

export default {
  name: 'app',
  components: {
    SnackBar, List
  },
  methods: {
      deleteTask(index,id) {
          this.$http.delete("http://localhost:3000/tasks/" + id).then(() => {
              this.tasks.splice(index,1);
              this.$emit('message', "Deleted!")
          }).catch(this.httpError);
      },
      httpError() {
          this.$emit('message', "Error during the request!");
      },
      addTask() { 
            if (this.taskName) { 
              let task = { name : this.taskName }; 
              this.$http.post("http://localhost:3000/tasks/", task).then(response => {
                  this.tasks.push(response.data); 
                  this.$emit('message', "Created!")
              }).catch(this.httpError);
            }
            this.taskName = "";
      },
      showMessage(message) {
          this.message = message;
          setTimeout(() => {
              this.message = null;
          }, 3000);
      },
      fetchData() {
          this.$http.get("http://localhost:3000/lists/" + this.$route.params.id + "/tasks/").then(response => {
                this.tasks = response.data;
          })
      }
  },
  watch : {
      '$route' : 'fetchData'
  },
  created() {
      this.fetchData();
      this.$on('message', this.showMessage);
  },
  data() {
      return {
        taskName : "",
        tasks : [],
        message: null
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
