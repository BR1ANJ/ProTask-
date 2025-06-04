import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { Feather as FeatherIcon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

type FeatherIconName = React.ComponentProps<typeof FeatherIcon>['name'];

const FeatureItem: React.FC<{ icon: FeatherIconName; text: string }> = ({ icon, text }) => (
  <View style={styles.benefitRow}>
    <FeatherIcon name={icon} size={24} color="#3b82f6" />
    <Text style={styles.paragraph}>{text}</Text>
  </View>
);

const LandingPage: React.FC = () => {
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);
  const [contactY, setContactY] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={[styles.buttonText, { marginTop: 10 }]}>Cargando...</Text>
      </View>
    );
  }

  const handleScrollToContact = () => {
    scrollRef.current?.scrollTo({ y: contactY, animated: true });
    setMenuVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView ref={scrollRef} style={styles.container}>
        <ImageBackground
          source={{
            uri: 'https://i.pinimg.com/originals/8a/2e/4c/8a2e4c79a1b9c983dc6bf8d6cbada43a.gif',
          }}
          style={styles.hero}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <Animatable.View animation="fadeInDown" delay={200} style={styles.content}>
            <Text style={styles.title}>Organiza tu trabajo con ProTask</Text>
            <Text style={styles.subtitle}>
              La herramienta que potencia tu productividad
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleScrollToContact}
              accessibilityLabel="Contáctanos"
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FeatherIcon name="mail" color="#fff" size={18} style={{ marginRight: 8 }} />
                <Text style={styles.buttonText}>Contáctanos</Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        </ImageBackground>

        {/* Sección "¿Qué ofrecemos?" */}
        <Animatable.View animation="fadeInUp" delay={200} style={styles.section}>
          <LinearGradient colors={['#1e1f21', '#2c2f33']} style={styles.gradient}>
            <Text style={styles.sectionTitle}>¿Qué ofrecemos?</Text>
            <Text style={styles.box}>⚡ Servicios rápidos y eficientes</Text>
            <Text style={styles.box}>💡 Ideas innovadoras y personalizadas</Text>
            <Text style={styles.box}>🌍 Atención global y soporte 24/7</Text>
          </LinearGradient>
        </Animatable.View>

        {/* Sección de características */}
        <Animatable.View animation="fadeInUp" delay={300} style={styles.section}>
          <Text style={styles.sectionTitle}>ProTask: Gestión de Proyectos Visual</Text>
          <Text style={styles.paragraph}>
            ProTask es una herramienta de gestión de proyectos intuitiva que te permite organizar tus tareas de manera eficiente.
          </Text>
          <Text style={styles.boxTitle}>📌 Visualización Clara</Text>
          <Text style={styles.paragraph}>Organiza tareas en un tablero visual.</Text>

          <Text style={styles.boxTitle}>🤝 Colaboración en Tiempo Real</Text>
          <Text style={styles.paragraph}>Comparte tableros con tu equipo.</Text>

          <Text style={styles.boxTitle}>🔔 Notificaciones y Recordatorios</Text>
          <Text style={styles.paragraph}>Recibe alertas de próximas tareas.</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Register')}
            accessibilityLabel="Comienza ahora con ProTask"
          >
            <Text style={styles.buttonText}>Comienza Ahora</Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* Sección de beneficios */}
        <Animatable.View animation="fadeInUp" delay={500} style={styles.section}>
          <Text style={styles.sectionTitle}>Beneficios de Usar ProTask</Text>
          <FeatureItem icon="check-circle" text="Planificación sencilla y visual" />
          <FeatureItem icon="users" text="Trabajo en equipo mejor coordinado" />
          <FeatureItem icon="clock" text="Gestión eficiente del tiempo" />
        </Animatable.View>

        {/* Preguntas Frecuentes */}
        <Animatable.View animation="fadeInUp" delay={700} style={styles.section}>
          <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
          <Text style={styles.boxTitle}>💰 ¿Es gratis ProTask?</Text>
          <Text style={styles.paragraph}>Sí, ofrecemos un plan gratuito con funciones básicas.</Text>

          <Text style={styles.boxTitle}>👥 ¿Puedo usarlo con mi equipo?</Text>
          <Text style={styles.paragraph}>Claro, puedes invitar a colaboradores fácilmente.</Text>

          <Text style={styles.boxTitle}>📱 ¿Tiene app móvil?</Text>
          <Text style={styles.paragraph}>Sí, disponible para Android y iOS.</Text>
        </Animatable.View>

        {/* Sección Contacto */}
        <Animatable.View
          animation="fadeInUp"
          delay={800}
          style={styles.section}
          onLayout={(event) => {
            const { y } = event.nativeEvent.layout;
            setContactY(y);
          }}
        >
          <Text style={styles.sectionTitle}>Contáctanos</Text>
          <View style={styles.contactRow}>
            <FeatherIcon name="mail" size={20} color="#fff" />
            <Text style={styles.paragraph}> contacto@misitio.com</Text>
          </View>
          <View style={styles.contactRow}>
            <FeatherIcon name="phone" size={20} color="#fff" />
            <Text style={styles.paragraph}> +34 600 123 456</Text>
          </View>
          <View style={styles.contactRow}>
            <FeatherIcon name="map-pin" size={20} color="#fff" />
            <Text style={styles.paragraph}> Calle Ejemplo 123, Ciudad</Text>
          </View>
          <View style={styles.contactRow}>
            <FeatherIcon name="clock" size={20} color="#fff" />
            <Text style={styles.paragraph}> Lunes a Viernes de 9:00 a 18:00</Text>
          </View>
        </Animatable.View>
      </ScrollView>

      {/* Botón flotante */}
      <Animatable.View
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        style={styles.floatingButton}
      >
        <TouchableOpacity
          onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
          accessibilityLabel="Volver arriba"
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>↑</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Botón menú */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuVisible(!menuVisible)}
        accessibilityLabel={menuVisible ? "Cerrar menú" : "Abrir menú"}
      >
        <FeatherIcon name="menu" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Menú con animación y overlay */}
      {menuVisible && (
        <>
          <TouchableOpacity
            style={styles.menuOverlay}
            onPress={() => setMenuVisible(false)}
            accessible={false}
          />
          <Animatable.View animation="fadeInRight" duration={300} style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => alert('Perfil')}>
              <Text style={styles.menuText}>Perfiles</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Formulario');
              }}
            >
              <Text style={styles.menuText}>Formulario</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Login');
              }}
            >
              <Text style={styles.menuText}>Iniciar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                handleScrollToContact();
                setMenuVisible(false);
              }}
            >
              <Text style={styles.menuText}>Contáctanos</Text>
            </TouchableOpacity>
          </Animatable.View>
        </>
      )}
    </SafeAreaView>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1f21' },
  section: { padding: 20 },
  title: {
    fontSize: 26,
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins_400Regular',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 10,
  },
  box: {
    color: '#eee',
    marginBottom: 10,
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
  },
  boxTitle: {
    color: '#3b82f6',
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    marginTop: 10,
  },
  paragraph: {
    color: '#ccc',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    marginVertical: 5,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
  },
  hero: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30,31,33,0.7)',
  },
  content: {
    paddingHorizontal: 20,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1f21',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#3b82f6',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 30,
    elevation: 6,
  },
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  menu: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#2c2f33',
    paddingVertical: 10,
    width: 180,
    borderRadius: 8,
    elevation: 7,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  gradient: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
});
