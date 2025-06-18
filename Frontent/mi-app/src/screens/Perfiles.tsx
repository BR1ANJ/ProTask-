import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Perfil = {
  nombre: string;
  descripcion: string;
  imagen: string;
  clave: string;
};

type RootStackParamList = {
  IngMartin: undefined;
  IngManuel: undefined;
  IngDaniel: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const perfiles: Perfil[] = [
  {
    nombre: 'Ing.Martin',
    descripcion: 'Jefe de Tecnologías de la Información',
    imagen: 'https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg',
    clave: 'taco',
  },
  {
    nombre: 'Ing.Manuel',
    descripcion: 'Encargado de redes y cableado estructurado',
    imagen: 'https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg',
    clave: 'molotes',
  },
  {
    nombre: 'Ing.Daniel',
    descripcion: 'Especialista en soporte técnico y mantenimiento',
    imagen: 'https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg',
    clave: 'torta',
  },
];

export default function Perfiles() {
  const navigation = useNavigation<NavigationProp>();
  const [mostrarInput, setMostrarInput] = useState<number | null>(null);
  const [palabras, setPalabras] = useState<string[]>(Array(perfiles.length).fill(''));
  const [mensajes, setMensajes] = useState<string[]>(Array(perfiles.length).fill(''));

  const validarPalabra = (index: number) => {
    const perfil = perfiles[index];
    Keyboard.dismiss();
    if (palabras[index].toLowerCase() === perfil.clave) {
      navegar(perfil.nombre);
      setMensajes((prev) => {
        const arr = [...prev];
        arr[index] = '✅ Bienvenido, acceso concedido';
        return arr;
      });
    } else {
      setMensajes((prev) => {
        const arr = [...prev];
        arr[index] = '❌ Palabra secreta incorrecta';
        return arr;
      });
    }
  };

  const navegar = (nombre: string) => {
    switch (nombre) {
      case 'Ing.Martin':
        navigation.navigate('IngMartin');
        break;
      case 'Ing.Manuel':
        navigation.navigate('IngManuel');
        break;
      case 'Ing.Daniel':
        navigation.navigate('IngDaniel');
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfiles del Equipo</Text>
      {perfiles.map((perfil, i) => (
        <View key={i} style={styles.card}>
          <Image
            source={{ uri: perfil.imagen }}
            style={styles.image}
            accessibilityLabel={`${perfil.nombre} imagen`}
          />
          <Text style={styles.name}>{perfil.nombre}</Text>
          <Text style={styles.description}>{perfil.descripcion}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setMostrarInput(mostrarInput === i ? null : i);
              setMensajes((prev) => prev.map((_, j) => (j === i ? '' : prev[j])));
              setPalabras((prev) => prev.map((_, j) => (j === i ? '' : prev[j])));
            }}
          >
            <Text style={styles.buttonText}>Iniciar</Text>
          </TouchableOpacity>

          {mostrarInput === i && (
            <>
              <TextInput
                placeholder="Introduce tu palabra secreta"
                placeholderTextColor="#999"
                style={styles.input}
                secureTextEntry
                value={palabras[i]}
                onChangeText={(text) =>
                  setPalabras((prev) => {
                    const arr = [...prev];
                    arr[i] = text;
                    return arr;
                  })
                }
              />
              <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={() => validarPalabra(i)}>
                <Text style={styles.buttonText}>Validar</Text>
              </TouchableOpacity>
              {mensajes[i] !== '' && <Text style={styles.mensaje}>{mensajes[i]}</Text>}
            </>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1f21',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    width: '90%',
    backgroundColor: '#2c2f33',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    color: '#3b82f6',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#444',
    color: '#fff',
    width: '100%',
    padding: 10,
    borderRadius: 8,
  },
  mensaje: {
    marginTop: 10,
    fontSize: 14,
    color: '#fff',
  },
});
