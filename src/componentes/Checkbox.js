import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import {Entypo} from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { updateTodoReducer } from "../storage/tareaSlice";


export default function Checkbox({id, estaCompletada}) {

  const listaTareas = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  const presionarCheckbox = () => {
      try {
          dispatch(updateTodoReducer({id, estaCompletada}));
          AsyncStorage.setItem('Tareas', JSON.stringify(
            listaTareas.map(tarea => { 
              if(tarea.id === id) {
                return {...tarea, estaCompletada: !tarea.estaCompletada};
              }
              return tarea;
            }

          )));
        } catch (e) {
          console.log(e);
        }
  }

    return(
        <TouchableOpacity onPress={presionarCheckbox} 
            style={estaCompletada ? styles.checked : styles.unChecked}>
            {estaCompletada && <Entypo name="check" size={20} color="#FAFAFA" />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    checked: {
        width: 20,
        height: 20,
        marginRight: 13,
        borderRadius: 6,
        backgroundColor: '#262626',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: .3,
        shadowRadius: 5,
        elevation: 5,
    },
    unChecked: {
        width: 20,
        height: 20,
        marginRight: 13,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        borderRadius: 6,
        backgroundColor: '#fff',
        marginLeft: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: .1,
        shadowRadius: 5,
        elevation: 5,
    },
})
