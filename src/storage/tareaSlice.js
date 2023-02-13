import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
};

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        //Cargar tareas
        setTodosReducer: (state, action) => {
            state.todos = action.payload;
            //console.log(state.todos);
        },
        //Agregar tarea
        addTodoReducer: (state, action) => {
            state.todos.push(action.payload);
        },
        //Ocultar completadas
        hideComplitedReducer: (state, action) => {
            state.todos = state.todos.filter(todo => !todo.estaCompletada);
        },
        //Marcar como completada o desmarcar
        updateTodoReducer: (state, action) => {
            state.todos = state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    todo.estaCompletada = !todo.estaCompletada;
                }
                return todo;
            }); 
        },
        //Eliminar tarea
        deleteTodoReducer: (state, action) => {
            const id = action.payload;
            const todos = state.todos.filter(todo => todo.id !== id);
            state.todos = todos;
        },
        //Editar tarea
        editTodoReducer: (state, action) => {
            state.todos = state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    todo.text = action.payload.name
                }
                return todo;
            }); 
        }
    },
});

export const { setTodosReducer, 
    addTodoReducer, 
    updateTodoReducer, 
    hideComplitedReducer, 
    deleteTodoReducer,
    editTodoReducer} = todosSlice.actions;
    
export default todosSlice.reducer;