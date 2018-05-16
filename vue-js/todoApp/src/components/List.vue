<template>
  <div>
      <ListItem v-for="(item,index) in items" :key="item.id"
                    v-on:select="select" v-on:delete="deleteItem"
                    :item="item" :index="index" :active="isActive(index)">
     </ListItem>
</div>
</template>

<script>
import ListItem from './ListItem.vue'

export default {
    name: "List",
    props: ["items"],
    components : {
        ListItem
    },
    methods: {
        isActive(index) {
            return this.selected === index;
        },
        select(index) {
            if (this.isActive(index)) {
                this.selected = -1;
            } else {
                this.selected = index;
            }
        },
        deleteItem(index,id) {
            this.selected = -1;
            this.$emit('delete', index, id);
        }
    },
    data() {
        return {
            selected : -1
        }
    }
}
</script>

<style>

</style>
