import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingPage from './src/screens/ladingPage';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import Formulario from './components/formulario';
import PerfilCards from './src/screens/Inicio';  // Asegúrate que el componente PerfilCards esté exportado por defecto en Inicio.tsx

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
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Inicio"
          component={PerfilCards} // ✅ Aquí está corregido
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
