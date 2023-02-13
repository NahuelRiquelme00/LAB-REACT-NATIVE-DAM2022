import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Button} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {editTodoReducer} from "../storage/tareaSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute} from "@react-navigation/native";
import { nothing } from "immer";

export default function PantallaEditarTarea(){
    const [name, setName] = React.useState('');
    const listaTareas = useSelector(state => state.todos.todos);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    const { text, id } = route.params;

    //Funcion para editar la tarea
    const editarTarea = async () => {
        try {
            dispatch(editTodoReducer({id, name}));

            AsyncStorage.setItem('@Tareas', JSON.stringify(
                listaTareas.map(tarea => { 
                if(tarea.id === id) {          
                    return {...tarea, text: name};
                }
                return tarea;
                }
            )));

            console.log("Tarea editada correctamente");
            navigation.goBack();
        } catch (e) {
            console.log(e);
            }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Tarea</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    defaultValue={text}
                    placeholderTextColor="#00000030"
                    onChangeText={(text) => {setName(text)}} 
                /> 
            </View>
            <View style={styles.inputContainer}>
            </View>
            <TouchableOpacity style={styles.button} onPress={editarTarea}>
                <Text style={{color: 'white'}}>Guardar</Text>
            </TouchableOpacity>    
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    textInput: {
        fontSize: 20,
        borderBottomColor: '#00000030',
        borderBottomWidth: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
        paddingHorizontal: 30,
    },
    inputContainer: {
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        paddingBottom: 30,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        height: 45,
        borderRadius: 10,
    }
});