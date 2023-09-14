<script setup lang="ts">
import { TodoStatus, type Todo } from '@/type';
import { reactive, ref } from 'vue';
import useTodos from '@/store/useTodos';

interface Props {
    status: TodoStatus;
};
const props = defineProps<Props>();
const shouldDisplayForm = ref(false);
const { addNewTodo } = useTodos();

const newTodo = reactive<Omit<Todo, "id">>({
    title:"",
    description:"",
    status: props.status
});

const resetForm = ()=> {
    shouldDisplayForm.value = false;
    newTodo.title = "";
    newTodo.description = "";
};

const handleOnSubmit = ()=>{
    // add a new todo
    addNewTodo({
        id: Math.random() * 100000000000000000,
        ...newTodo});

    resetForm();
}

</script>

<template>
    <div>
        <h3 v-if="!shouldDisplayForm" @click="shouldDisplayForm = !shouldDisplayForm">Add New</h3>
        <template v-else >
            <form action="" @submit.prevent="handleOnSubmit">
                <div>
                    <input type="text" placeholder="Title" v-model="newTodo.title">
                </div>
                <div>
                    <textarea type="text" placeholder="Description" v-model="newTodo.description"></textarea>
                </div>
                <button class="btn" type="submit">Submit</button>
                <button class="btn" type="button" @click="resetForm" >Cancel</button>
            </form>            
        </template>
    </div>
</template>

<style scoped>
h3{
    cursor: pointer;
    background: #dedada32;
    padding-left: 10px;
    border-radius: 20px;
}
.btn{
    border: none;
    border-radius: 20px;

    color: #fff;
    margin-left: 20px;
    padding: 5px;
    cursor: pointer;
    background: #dedada32;

}

.btn:hover{
    background: #a910eaa4;
}

</style>
