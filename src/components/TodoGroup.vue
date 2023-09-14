<script setup lang="ts">
import Draggable from 'vuedraggable'
import { TodoStatus, type Todo } from '@/type';
import useTodos from '@/store/useTodos';
import CreateTodo from './CreateTodo.vue';

interface Props {
    status: TodoStatus;
};
const props = defineProps<Props>();

const { getTodosByStatus, deletedTodo, updateTodo } = useTodos();
const todoList = getTodosByStatus(props.status);

const groupLabel = {
    [TodoStatus.Pending]: "Pending",
    [TodoStatus.InProgress]: "In Progress",
    [TodoStatus.Completed]: "Completed"
};

const onDraggableChange = (payload: any) => {
    // console.log("payload", payload);
    if(payload?.added?.element){
       // update To do Item
       updateTodo(payload?.added?.element, props.status);
    }
}

</script>

<template>
      <div class="groups-wrapper">
            <h3>{{ groupLabel[props.status] }}</h3>

            <Draggable 
                class="dragable" 
                :list="todoList" 
                group="todos" 
                itemKey="id"
                @change="onDraggableChange" >
                <template #item="{element: todo}">
                    <li>
                        {{ todo.title }} : {{ todo.status }}
                        <span class="delete-icon" @click="deletedTodo(todo)" >X</span>
                        <div>
                            <span class="todo-description">{{ todo.description }}</span>
                        </div>
                    </li>
                 </template>
            </Draggable>
            <CreateTodo :status="props.status"/>
      </div>
</template>

<style scoped>
.groups-wrapper{
    flex: 1;
    padding: 20px;
    background-color: #0b375d;
    display: flex;
    flex-direction: column;
}
.groups-wrapper > h3{
    padding-left: 10px;
    background-color: #761cedad;
    order: -1;
    justify-content: flex-start;

}
.groups-wrapper li{
    list-style-type: none;
    background-color: #227bac;
    padding: 2px 5px;
    cursor: grab;
    margin-bottom: 10px;
    position: relative;
    font-size: 16px;
    border-radius: 10px;
    /* box-shadow: 4px 3px 8px -3px rgb(237, 236, 236); */
    /* overflow: hidden;
    text-overflow: ellipsis; */
    /* white-space: nowrap; */
 
}
.dragable{
    min-height: 200px;
    min-width: 150px;
}

.todo-description{
    font-size: 14px;
    color: #6c0698;
}

.delete-icon{
    position: absolute;
    right: 2px;
    top: 2px;
    text-align: center;
    /* float: right; */
    cursor: pointer;
    width: 15px;
    height: 15px;
    background: #ae06cd;;
    border-radius: 50%;
    font-size: 10px;
}




</style>
