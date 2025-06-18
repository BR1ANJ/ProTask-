import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

type Reporte = {
  _id: string;
  nombre: string;
  correo: string;
  extension: string;
  grupo: string;
  sucursal: string;
  departamento: string;
  descripcion: string;
  incidente: string;
  urgencia: string;
  asesor: string;
  estado: 'proceso' | 'terminado';
  fecha: string;
  fechaTerminacion: string | null;
};

export default function IngManuel() {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchReportes = async () => {
    try {
      const response = await fetch(
        'http://192.168.1.160:4000/api/reportes/asesor/Ing Manuel'
      );
      const data = await response.json();
      setReportes(data);
    } catch (error) {
      console.error('Error al obtener reportes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportes();
  }, []);

  const toggleExpand = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const marcarComoTerminado = async (id: string) => {
    try {
      const response = await fetch(
        `http://192.168.1.160:4000/api/reportes/${id}/estado`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ estado: 'terminado' }),
        }
      );

      if (!response.ok) {
        throw new Error('Error al actualizar estado');
      }

      const data = await response.json();

      setReportes((prev) =>
        prev.map((r) =>
          r._id === id
            ? { ...r, estado: data.reporte.estado, fechaTerminacion: data.reporte.fechaTerminacion }
            : r
        )
      );

      Alert.alert('Éxito', 'El reporte fue marcado como terminado.');
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      Alert.alert('Error', 'No se pudo actualizar el estado del reporte.');
    }
  };

  const formatFecha = (fechaStr: string | null) => {
    if (!fechaStr) return 'Sin fecha';
    return new Date(fechaStr).toLocaleString('es-MX', {
      timeZone: 'America/Mexico_City',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const renderReportes = (lista: Reporte[], mostrarBoton: boolean) =>
    lista.map((reporte) => (
      <TouchableOpacity
        key={reporte._id}
        onPress={() => toggleExpand(reporte._id)}
        style={styles.card}
      >
        <Text style={styles.label}>👤 {reporte.nombre}</Text>
        {selectedId === reporte._id && (
          <>
            <Text style={styles.label}>📧 Correo: {reporte.correo}</Text>
            <Text style={styles.label}>📞 Extensión: {reporte.extension}</Text>
            <Text style={styles.label}>🏢 Grupo: {reporte.grupo}</Text>
            <Text style={styles.label}>📍 Sucursal: {reporte.sucursal}</Text>
            <Text style={styles.label}>🧑‍💼 Departamento: {reporte.departamento}</Text>
            <Text style={styles.label}>❗ Incidente: {reporte.incidente}</Text>
            <Text style={styles.label}>🔥 Urgencia: {reporte.urgencia}</Text>
            <Text style={styles.label}>📝 Descripción: {reporte.descripcion}</Text>

            <Text style={styles.label}>
              📅 Fecha de creación: {formatFecha(reporte.fecha)}
            </Text>

            <Text style={styles.label}>
              ✅ Fecha de terminación: {formatFecha(reporte.fechaTerminacion)}
            </Text>

            {mostrarBoton && reporte.estado === 'proceso' && (
              <View style={styles.buttonContainer}>
                <Button
                  title="✅ Marcar como terminado"
                  color="#22c55e"
                  onPress={() => marcarComoTerminado(reporte._id)}
                />
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    ));

  const enProceso = reportes.filter((r) => r.estado === 'proceso');
  const terminados = reportes.filter((r) => r.estado === 'terminado');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📘 Reportes asignados a Ing. Manuel</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#38bdf8" />
      ) : reportes.length === 0 ? (
        <Text style={styles.noData}>No hay reportes asignados.</Text>
      ) : (
        <>
          <Text style={styles.sectionTitle}>🛠️ En proceso</Text>
          {enProceso.length > 0 ? (
            renderReportes(enProceso, true)
          ) : (
            <Text style={styles.noData}>Sin reportes en proceso.</Text>
          )}

          <Text style={styles.sectionTitle}>✅ Terminados</Text>
          {terminados.length > 0 ? (
            renderReportes(terminados, false)
          ) : (
            <Text style={styles.noData}>Sin reportes terminados.</Text>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121826',
    padding: 20,
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#38bdf8',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#facc15',
    marginBottom: 10,
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    marginBottom: 10,
  },
  label: {
    color: '#f1f5f9',
    marginBottom: 5,
  },
  noData: {
    color: '#94a3b8',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});