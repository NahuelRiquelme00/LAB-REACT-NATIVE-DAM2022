import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./tareaSlice";

export const store = configureStore({
    reducer: {
        todos: todosReducer,
    }
});