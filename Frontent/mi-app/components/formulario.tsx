import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const incidentOptions: string[] = ['Elegir',
  'SAPB1 NO RESPONDE',
  'NO PUEDO CONECTARME AL ESCRITORIO REMOTO',
  'MI DISPOSITIVO NO ENCIENDE',
  'NO PUEDO IMPRIMIR',
  'ERROR EN FACTURA',
  'ASESORIA',
  'CAMBIO DE TONER',
  'INSTALACION DE SOFTWARE',
  'FALLA EN CONEXION A INTERNET',
  'Otros',
];

const urgenciaOptions: string[] = ['Elegir','Baja', 'Media', 'Alta', 'Crítica'];
const grupoOptions: string[] = ['Elegir','CIPSA', 'CIESA'];
const sucursalOptions: string[] = ['Elegir',
  'Planta 1', 'Planta 2', 'Planta 3', 'Planta 4', 'Puebla', 'Queretaro',
  'Guadalajara', 'Cancun', 'Hermosillo', 'Ciesa', 'Toluca', 'AguasCalientes',
  'Tijuana', 'Merida', 'Iztacalco'
];
const departamentoOpcion: string[] = ['Elegir',
  'Marketing','Recepcion','Direccion','Proyectos','Gestion Financiera',
  'Logistica','Adquisiones','Almacen','Produccion','Ingenieria','Calidad',
  'Mantenimiento','Caseta','Juridico','Bombas','Ventas','RH','TI'
];
const asesorOptions: string[] = ['Elegir','Ing Martin', 'Ing Manuel', 'Ing Daniel'];

const MesaAyudaForm: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [extension, setExtension] = useState('');
  const [grupo, setGrupo] = useState(grupoOptions[0]);
  const [sucursal, setSucursal] = useState(sucursalOptions[0]);
  const [departamento, setDepartamento] = useState(departamentoOpcion[0]);
  const [descripcion, setDescripcion] = useState('');
  const [incidente, setIncidente] = useState(incidentOptions[0]);
  const [urgencia, setUrgencia] = useState(urgenciaOptions[0]);
  const [asesor, setAsesor] = useState(asesorOptions[0]);

  const handleEnviar = () => {
    if (
      !nombre.trim() ||
      !correo.trim() ||
      !extension.trim() ||
      grupo === 'Elegir' ||
      sucursal === 'Elegir' ||
      departamento === 'Elegir' ||
      incidente === 'Elegir' ||
      urgencia === 'Elegir' ||
      asesor === 'Elegir' ||
      !descripcion.trim()
    ) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios (*)');
      return;
    }

    Alert.alert('Enviado', 'Tu reporte ha sido recibido correctamente');

    // Reset fields
    setNombre('');
    setCorreo('');
    setExtension('');
    setGrupo(grupoOptions[0]);
    setSucursal(sucursalOptions[0]);
    setDepartamento(departamentoOpcion[0]);
    setDescripcion('');
    setIncidente(incidentOptions[0]);
    setUrgencia(urgenciaOptions[0]);
    setAsesor(asesorOptions[0]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📋 Mesa de Ayuda de TI</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre: *</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Tu nombre"
          placeholderTextColor="#a0aec0"
        />

        <Text style={styles.label}>Correo: *</Text>
        <TextInput
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#a0aec0"
        />

        <Text style={styles.label}>Extensión o WhatsApp: *</Text>
        <TextInput
          style={styles.input}
          value={extension}
          onChangeText={setExtension}
          placeholder="Número de contacto"
          keyboardType="phone-pad"
          placeholderTextColor="#a0aec0"
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📌 Información del Reporte</Text>

          <Text style={styles.label}>Grupo al cual pertenece: *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={grupo}
              onValueChange={setGrupo}
              style={styles.picker}
              dropdownIconColor="#2b6cb0"
            >
              {grupoOptions.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Sucursal: *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={sucursal}
              onValueChange={setSucursal}
              style={styles.picker}
              dropdownIconColor="#2b6cb0"
            >
              {sucursalOptions.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Departamento: *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={departamento}
              onValueChange={setDepartamento}
              style={styles.picker}
              dropdownIconColor="#2b6cb0"
            >
              {departamentoOpcion.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>¿Quién te asesora?: *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={asesor}
              onValueChange={setAsesor}
              style={styles.picker}
              dropdownIconColor="#2b6cb0"
            >
              {asesorOptions.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Tipo de incidente: *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={incidente}
              onValueChange={setIncidente}
              style={styles.picker}
              dropdownIconColor="#2b6cb0"
            >
              {incidentOptions.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Nivel de urgencia: *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={urgencia}
              onValueChange={setUrgencia}
              style={styles.picker}
              dropdownIconColor="#2b6cb0"
            >
              {urgenciaOptions.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>
        </View>

        <Text style={styles.label}>Descripción de incidente: *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Describe detalladamente el problema"
          multiline
          numberOfLines={4}
          placeholderTextColor="#a0aec0"
        />

        <TouchableOpacity style={styles.button} onPress={handleEnviar}>
          <Text style={styles.buttonText}>📨 Enviar Reporte</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MesaAyudaForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e293b',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#93c5fd',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#334155',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#475569',
    padding: 16,
    borderRadius: 12,
    borderColor: '#64748b',
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e0e7ff',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#64748b',
    padding: Platform.OS === 'ios' ? 14 : 12,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#94a3b8',
    color: '#f1f5f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    borderRadius: 10,
    backgroundColor: '#64748b',
    borderWidth: 1,
    borderColor: '#94a3b8',
    marginBottom: 16,
    overflow: 'hidden',
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 6,
    justifyContent: 'center',
    height: 48,
  },
  picker: {
    color: '#1e293b', // Texto oscuro para mejor visibilidad en menú
    width: '100%',
    height: Platform.OS === 'ios' ? 48 : 50,
    backgroundColor: 'transparent',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#1e40af',
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#f1f5f9',
    fontWeight: '700',
    fontSize: 16,
  },
});
