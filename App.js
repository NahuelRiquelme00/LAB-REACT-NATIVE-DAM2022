import PantallaInicial from "./src/pantallas/PantallaInicial";
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PantallaNuevaTarea from "./src/pantallas/PantallaNuevaTarea";
import PantallaEditarTarea from "./src/pantallas/PantallaEditarTarea";
import {store} from "./src/storage/store";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();

export default function App(){  
  return(    
    <Provider store={store}>
       <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Inicio'
            component={PantallaInicial}
            options={{
              title: 'Lista de tareas',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name='Agregar tarea'
            component={PantallaNuevaTarea}
            options={{
              title: 'Agregar nueva tarea',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name='Editar tarea'
            component={PantallaEditarTarea}
            options={{
              title: 'Editar tarea',
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}