import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingPage from './src/screens/ladingPage';  // Importa la LandingPage real
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import Formulario from './components/formulario';    // Importa el formulario

type RootStackParamList = {
  Landing: undefined;
  Inicio: undefined;
  Details: undefined;
  Formulario: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={LandingPage}   // Ahora sí la LandingPage real
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
          options={{ title: 'Inicio' }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Detalles' }}
        />
        <Stack.Screen
          name="Formulario"
          component={Formulario}
          options={{ title: 'Formulario de Mesa de Ayuda' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
