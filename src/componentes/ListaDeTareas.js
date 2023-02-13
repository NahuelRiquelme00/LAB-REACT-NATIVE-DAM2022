import React from "react";
import { FlatList,Text } from "react-native";
import RenderizarTarea from "./RenderizarTarea";

const ListaDeTareas = ({tareasDatos}) => {
    return (
        <FlatList 
            data={tareasDatos}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <RenderizarTarea {...item}/>}
        />
    )
}

export default ListaDeTareas
