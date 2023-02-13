import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ListaDeTareas from "../componentes/ListaDeTareas";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hideComplitedReducer, setTodosReducer } from "../storage/tareaSlice";
import { AntDesign } from '@expo/vector-icons'; 

export default function PantallaInicial() {
    //Lista de tareas
    const listaTareas = useSelector(state => state.todos.todos);

    //Para guardar es estado de si las completadas estan ocultas
    const [estanOcultas, setEstanOcultas] = React.useState(false);

    //Ocultar tareas completadas al presionar ocultar
    const ocultarCompletadas  = async () => {
        if (estanOcultas) {
            setEstanOcultas(false);
            const todos = await AsyncStorage.getItem('@Tareas');
            if(todos !== null){
                dispatch(setTodosReducer(JSON.parse(todos)));
            }
            return;
        }
        setEstanOcultas(!estanOcultas);
        dispatch(hideComplitedReducer());
    }

    //Nos permite navegar hacia la segunda pantalla
    const navigation = useNavigation();

    //Dispatch
    const dispatch = useDispatch();

    //Obtener y cargar las tareas guardadas
    React.useEffect(() => {
        const obtenerTareas = async () => {
            try {
                const tareas = await AsyncStorage.getItem("@Tareas");
                if(tareas != null){
                    dispatch(setTodosReducer(JSON.parse(tareas)));
                }
            } catch (error) {
                console.log(error)
            }
        }
        obtenerTareas();
    }, []);

    return (
        <View style={styles.container}> 
            <View style={{flexDirection: 'row', alignItems:'center' , justifyContent:'space-between'}}>
                <Text style={styles.title}> Tareas </Text>
                <TouchableOpacity onPress={ocultarCompletadas}>
                    <Text style={{color: '#3478f6'}}> {estanOcultas ? 'Mostrar completadas' : 'Ocultar completadas'} </Text>
                </TouchableOpacity>
            </View>

            <ListaDeTareas tareasDatos={listaTareas}/>

            <TouchableOpacity onPress={() => navigation.navigate("Agregar tarea")} style={styles.button}> 
                <AntDesign name="pluscircle" size={50} color="black" />
            </TouchableOpacity>
        </View>
    );
}

//Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    button: {
        position: 'absolute',
        bottom: 50,
        right: 15,
    },
})

