import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Checkbox from "./Checkbox";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoReducer } from "../storage/tareaSlice";
import { useNavigation } from "@react-navigation/native";

const RenderizarTarea = ({id, text, estaCompletada,}) => {

    const listaTareas = useSelector(state => state.todos.todos);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const eliminarTarea = async () => {
        dispatch(deleteTodoReducer(id));
        try {
          await AsyncStorage.setItem('@Tareas', JSON.stringify(
            listaTareas.filter(tarea => tarea.id !== id)
          ));
          console.log('Tarea eliminada correctamente');
        } catch (e) {
          console.log(e);
        }
    }



    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Checkbox id = {id} estaCompletada={estaCompletada}/>
                <View>
                    <Text style={estaCompletada ? 
                        [styles.text, {textDecorationLine: 'line-through', color: '#73737330'}] 
                        : styles.text}> {text} 
                    </Text>
                </View>
            </View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <TouchableOpacity onPress={eliminarTarea}>
                    <MaterialIcons name="delete-outline" size={24} color="#73737340" style={styles.delete} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>
                     navigation.navigate("Editar tarea", {text: text, id: id})}>
                    <MaterialIcons name="edit" size={24} color="#73737340" style={styles.delete} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        color: '#737373'
    },

})

export default RenderizarTarea