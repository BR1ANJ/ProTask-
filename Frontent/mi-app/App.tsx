import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './src/screens/ladingPage';
import Perfiles from './src/screens/Perfiles';
import Formulario from './components/formulario';
import IngMartin from './src/screens/IngMartin';
import IngManuel from './src/screens/IngManuel';
import IngDaniel from './src/screens/IngDaniel';

export type Reporte = {
  nombre: string;
  correo: string;
  extension: string;
  grupo: string | null;
  sucursal: string | null;
  departamento: string | null;
  descripcion: string;
  incidente: string | null;
  urgencia: string | null;
  asesor: string | null;
};

export type RootStackParamList = {
  Landing: undefined;
  Perfiles: undefined;
  Formulario: undefined;
  IngMartin: { reporte: Reporte };
  IngManuel: { reporte: Reporte };
  IngDaniel: { reporte: Reporte };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Perfiles" component={Perfiles} />
        <Stack.Screen name="Formulario" component={Formulario} />
        <Stack.Screen name="IngMartin" component={IngMartin} />
        <Stack.Screen name="IngManuel" component={IngManuel} />
        <Stack.Screen name="IngDaniel" component={IngDaniel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
