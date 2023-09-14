<script setup lang="ts">
import { ref, watch } from "vue";
import TodoList from "./components/TodoList.vue"

const name = ref('');

watch(name, (newVal) => {
  localStorage.setItem('name', newVal)
})

</script>

<template>
      <div class="app-wrapper">
        <div class="heading">
            <h1>TODO APP</h1>
            <h2>  Hello,  <input class="username" type="text" placeholder="NAME HERE"
              v-model="name" /></h2>
        </div>

        <div class="wrapper">
            <TodoList />
        </div>
      
      </div>
</template>

<style scoped>

.app-wrapper{
    align-items: center;
    display: grid;
    place-items: center;
}
.wrapper{
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
}

.heading {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: #2b394546;

    width: 340px;
    margin-bottom: 30px;
    padding-bottom: 10px;

}
h1 {
    font-weight: bold;
}

.username {
    border: none;
    border-radius: 20px;
    color: rgb(223, 14, 188);
    background: transparent;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
    padding-left: 10px;
    width: 200px;
    background: #dedada32;
}
.username:hover, .username:focus, .username:active{
    outline: none;
    background: #d2caca8e;
}
@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }
}

</style>
