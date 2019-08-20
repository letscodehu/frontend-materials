<template>
<div v-bind:class="{ active : active, 'list-item' : true }">
    <div class="title" v-on:click="select(index)">
        {{item.name}}
    </div>
    <div class="context">
        <i v-on:click="deleteItem(index,item.id)" class="fas fa-trash-alt"></i>
    </div>   
</div>
</template>

<script>
export default {
    name: "ListItem",
    props : ["index", "item", "active"],
    methods : {
        select(index) {
            this.$emit('select', index);
        },
        deleteItem(index,id) {
            this.$emit('delete', index, id);
        }
    }
}
</script>

<style>
.list-item.active {
    transition: 0.5s;
    margin-left: -10%!important;
}
.list-item {
    transition: 0.5s;
    overflow: hidden;
    line-height: 2em;
    display: table;
    width: 110%;
    border-top: 1px solid #5f5f5f;
}
.title {
    width: 100%;
    padding-left: 1em;
    display: table-cell;
    color: #3f3f3f;
}
.context {
    width: 10%;
    background-color: #d83e2b;
    color: #fff;
    padding-left: 0.5em;
    padding-right: 0.5em;
    text-align: center;
    display: table-cell;
}
</style>
