import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Button} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {addTodoReducer} from "../storage/tareaSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function PantallaNuevaTarea(){
    const [name, setName] = React.useState('');
    const listaTareas = useSelector(state => state.todos.todos);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    //Funcion para agregar la nueva tarea
    const agregarTarea = async () => {
        const nuevaTarea = {
            id: Math.floor(Math.random()*100000000),
            text: name,
            estaCompletada: false, 
        }
        try{
            await AsyncStorage.setItem("@Tareas",
             JSON.stringify([...listaTareas, nuevaTarea]));
            dispatch(addTodoReducer(nuevaTarea));
            console.log("Tarea guardada correctamente");
            navigation.goBack();
        }catch(e){
            console.log(e);
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Tarea</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="¿Que vas a hacer?"
                    placeholderTextColor="#00000030"
                    onChangeText={(text) => {setName(text)}} 
                /> 
            </View>
            <View style={styles.inputContainer}>
            </View>
            <TouchableOpacity style={styles.button} onPress={agregarTarea}>
                <Text style={{color: 'white'}}>Guardar</Text>
            </TouchableOpacity>    
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    textInput: {
        fontSize: 22,
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