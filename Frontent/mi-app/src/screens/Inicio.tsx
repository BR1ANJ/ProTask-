import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

type Perfil = {
  nombre: string;
  descripcion: string;
  imagen: string;
  clave: string; // ← palabra secreta
};

const perfiles: Perfil[] = [
  {
    nombre: 'Ing.Martin',
    descripcion: 'Jefe de Tecnologias de la infomacion ',
    imagen: 'https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg',
    clave: 'taco',
  },
  {
    nombre: 'Ing.Manuel',
    descripcion: '',
    imagen: 'https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg',
    clave: 'molotes',
  },
  {
    nombre: 'Ing.Daniel',
    descripcion: '',
    imagen: 'https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg',
    clave: 'torta',
  },
];

export default function PerfilCards() {
  const [mostrarInput, setMostrarInput] = useState<number | null>(null);
  const [palabraSecreta, setPalabraSecreta] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');

  const validarPalabra = (index: number) => {
    if (palabraSecreta.toLowerCase() === perfiles[index].clave) {
      setMensaje('✅ Bienvenido, acceso concedido');
    } else {
      setMensaje('❌ Palabra secreta incorrecta');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfiles del Equipo</Text>
      {perfiles.map((perfil, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: perfil.imagen }} style={styles.image} />
          <Text style={styles.name}>{perfil.nombre}</Text>
          <Text style={styles.description}>{perfil.descripcion}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setMostrarInput(mostrarInput === index ? null : index);
              setMensaje('');
              setPalabraSecreta('');
            }}
          >
            <Text style={styles.buttonText}>Iniciar</Text>
          </TouchableOpacity>

          {mostrarInput === index && (
            <>
              <TextInput
                placeholder="Introduce tu palabra secreta"
                placeholderTextColor="#999"
                style={styles.input}
                secureTextEntry
                value={palabraSecreta}
                onChangeText={setPalabraSecreta}
              />
              <TouchableOpacity
                style={[styles.button, { marginTop: 10 }]}
                onPress={() => validarPalabra(index)}
              >
                <Text style={styles.buttonText}>Validar</Text>
              </TouchableOpacity>
              {mensaje !== '' && <Text style={styles.mensaje}>{mensaje}</Text>}
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
    fontFamily: 'Poppins_700Bold',
    marginBottom: 20,
    textAlign: 'center',
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
    fontFamily: 'Poppins_700Bold',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    fontFamily: 'Poppins_400Regular',
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
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#444',
    color: '#fff',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    fontFamily: 'Poppins_400Regular',
  },
  mensaje: {
    marginTop: 10,
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
  },
});
