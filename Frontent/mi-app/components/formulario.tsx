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
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import type { RootStackParamList, Reporte } from '../../App';

type DropdownKeys = 'grupo' | 'sucursal' | 'departamento' | 'incidente' | 'urgencia' | 'asesor';

const opciones = {
  incidentes: [
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
  ],
  urgencias: ['Baja', 'Media', 'Alta', 'Crítica'],
  grupos: ['CIPSA', 'CIESA'],
  sucursales: [
    'Planta 1', 'Planta 2', 'Planta 3', 'Planta 4', 'Puebla', 'Queretaro',
    'Guadalajara', 'Cancun', 'Hermosillo', 'Ciesa', 'Toluca', 'AguasCalientes',
    'Tijuana', 'Merida', 'Iztacalco',
  ],
  departamentos: [
    'Marketing', 'Recepcion', 'Direccion', 'Proyectos', 'Gestion Financiera',
    'Logistica', 'Adquisiones', 'Almacen', 'Produccion', 'Ingenieria',
    'Calidad', 'Mantenimiento', 'Caseta', 'Juridico', 'Bombas', 'Ventas',
    'RH', 'TI',
  ],
  asesores: ['Ing Martin', 'Ing Manuel', 'Ing Daniel'],
};

// ... (importaciones sin cambios)

const MesaAyudaForm: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Reporte>({
    nombre: '',
    correo: '',
    extension: '',
    grupo: null,
    sucursal: null,
    departamento: null,
    descripcion: '',
    incidente: null,
    urgencia: null,
    asesor: null,
  });

  const [dropdowns, setDropdowns] = useState<Record<DropdownKeys, boolean>>({
    grupo: false,
    sucursal: false,
    departamento: false,
    incidente: false,
    urgencia: false,
    asesor: false,
  });

  const updateForm = (key: keyof Reporte, value: string | null) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleEnviar = async () => {
    const {
      nombre, correo, extension, grupo, sucursal,
      departamento, descripcion, incidente, urgencia, asesor,
    } = form;

    if (
      !nombre.trim() ||
      !correo.trim() ||
      !extension.trim() ||
      !grupo ||
      !sucursal ||
      !departamento ||
      !incidente ||
      !urgencia ||
      !asesor ||
      !descripcion.trim()
    ) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios (*)');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://192.168.1.160:4000/api/reportes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      Alert.alert('✔️ Enviado', 'Tu reporte ha sido registrado exitosamente.');

      switch (asesor) {
        case 'Ing Martin':
          navigation.navigate('IngMartin', { reporte: form });
          break;
        case 'Ing Manuel':
          navigation.navigate('IngManuel', { reporte: form });
          break;
        case 'Ing Daniel':
          navigation.navigate('IngDaniel', { reporte: form });
          break;
      }

      setForm({
        nombre: '',
        correo: '',
        extension: '',
        grupo: null,
        sucursal: null,
        departamento: null,
        descripcion: '',
        incidente: null,
        urgencia: null,
        asesor: null,
      });
    } catch (error: any) {
      Alert.alert('Error', 'No se pudo enviar el reporte: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderDropdown = (
    label: string,
    key: DropdownKeys,
    items: string[],
    zIndex: number
  ) => (
    <View
      style={{
        marginTop: 10,
        zIndex,
        elevation: Platform.OS === 'android' ? zIndex : 0,
      }}
      key={key}
    >
      <Text style={styles.label}>{label}</Text>
      <DropDownPicker
        open={dropdowns[key]}
        setOpen={(open: boolean) => setDropdowns((prev) => ({ ...prev, [key]: open }))}
        value={form[key] ?? undefined}
        setValue={(callback) => {
          const value = callback();
          updateForm(key, value);
        }}
        items={items.map((item) => ({ label: item, value: item }))}
        placeholder="Selecciona una opción"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={{ color: '#f1f5f9' }}
        placeholderStyle={{ color: '#94a3b8' }}
        listMode="SCROLLVIEW"
        dropDownDirection="BOTTOM"
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>📋 Mesa de Ayuda de TI</Text>
      <View style={styles.card}>
        {['nombre', 'correo', 'extension'].map((key) => (
          <View key={key}>
            <Text style={styles.label}>
              {key === 'nombre' && 'Nombre: *'}
              {key === 'correo' && 'Correo: *'}
              {key === 'extension' && 'Extensión o WhatsApp: *'}
            </Text>
            <TextInput
              style={styles.input}
              value={(form[key as keyof Reporte] ?? '') as string}
              onChangeText={(val) => updateForm(key as keyof Reporte, val)}
              placeholder={
                key === 'nombre'
                  ? 'Tu nombre'
                  : key === 'correo'
                  ? 'correo@ejemplo.com'
                  : 'Número de contacto'
              }
              keyboardType={
                key === 'correo' ? 'email-address' : key === 'extension' ? 'phone-pad' : 'default'
              }
              autoCapitalize={key === 'correo' ? 'none' : 'sentences'}
              editable={!loading}
            />
          </View>
        ))}

        {renderDropdown('Grupo *', 'grupo', opciones.grupos, 6000)}
        {renderDropdown('Sucursal *', 'sucursal', opciones.sucursales, 5000)}
        {renderDropdown('Departamento *', 'departamento', opciones.departamentos, 4000)}
        {renderDropdown('Incidente *', 'incidente', opciones.incidentes, 3000)}
        {renderDropdown('Urgencia *', 'urgencia', opciones.urgencias, 2000)}
        {renderDropdown('Asesor *', 'asesor', opciones.asesores, 1000)}

        <Text style={styles.label}>Descripción: *</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          multiline
          numberOfLines={4}
          value={form.descripcion}
          onChangeText={(val) => updateForm('descripcion', val)}
          placeholder="Describe tu problema"
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading ? { opacity: 0.6 } : {}]}
          onPress={handleEnviar}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Enviando...' : 'Enviar'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0f172a' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#f1f5f9', textAlign: 'center' },
  card: { backgroundColor: '#1e293b', borderRadius: 10, padding: 20, marginBottom: 20 },
  label: { color: '#f1f5f9', marginBottom: 5 },
  input: {
    backgroundColor: '#334155',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#f1f5f9',
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#334155',
    borderColor: '#64748b',
  },
  dropdownContainer: {
    backgroundColor: '#334155',
    borderColor: '#64748b',
  },
  button: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: '#f1f5f9',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default MesaAyudaForm;
