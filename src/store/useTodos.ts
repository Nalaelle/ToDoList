import { TodoStatus, type Todo } from "@/type";
import { computed, reactive, ref } from "vue";

interface TodoStore {
    [TodoStatus.Pending]: Todo[];
    [TodoStatus.InProgress]: Todo[];
    [TodoStatus.Completed]: Todo[];
};

const defaultVal = {
        [TodoStatus.Pending]: getLocalStorage().pending ||  [],
        [TodoStatus.InProgress]: getLocalStorage().inProgress || [],
        [TodoStatus.Completed]: getLocalStorage().completed || []
    };


const todoStore = reactive<TodoStore>(defaultVal);

// ***********
// function saveCart(cart: TodoStore[]){
//     return localStorage.setItem('Todos', JSON.stringify(cart));
// };
function getLocalStorage(){
    let cartTodo = JSON.parse(localStorage.getItem('Todos' ) || '[]' ) || []
    if(cartTodo === null) return []
    return cartTodo
}
// console.log(getLocalStorage().pending)

// ***********

export default () => {
    const getTodosByStatus = (todoStatus: TodoStatus) => {
        return computed(()=> todoStore[todoStatus]);
    };

    const addNewTodo = (todo: Todo) => {
        todoStore[todo.status].push(todo);
        localStorage.setItem("Todos", JSON.stringify(todoStore))

    };

    const deletedTodo = (todoToDelete: Todo) => {
        todoStore[todoToDelete.status] = todoStore[todoToDelete.status].filter(
            todo => todo.id !== todoToDelete.id
            );
        localStorage.setItem("Todos", JSON.stringify(todoStore))
    };

    const updateTodo = (todo: Todo, newStatus: TodoStatus) => {
        todo.status = newStatus;
        localStorage.setItem("Todos", JSON.stringify(todoStore))
    };

    return { getTodosByStatus, addNewTodo, deletedTodo, updateTodo };
};