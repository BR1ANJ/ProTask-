# ProTask-
Proyecto de gestión de proyectos mediante tableros visuales, optimizando tareas y productividad colaborativa.

### Nombre del proyecto: 
ProTask- 🙃

## Descripción del proyecto
<p align="justify">ProTask-Desarrollar una aplicación móvil de gestión de proyectos que implemente tableros visuales interactivos como principal medio para organizar, asignar y dar seguimiento a tareas, con el 
propósito de mejorar la planificación, la productividad y la comunicación en equipos de trabajo colaborativos</p>

---

## Planteamiento del problema
<p align="justify">En la actualidad no hay  gestores de proyectos implementando tableros visuales interactivas como principal medio para organizar.</p>

  - Dueños que trabajan largas jornadas o tienen horarios variables
  - Cargas de trabajo 
  - Cuidado de informacion 
  - Trabajos pesados  

Estas situaciones pueden resultar en:

  - Tener una buena flexibidad
  - Dificultad para mantener un registro de entrada y salida 
  - Estrés para los trabajadores 
  - Potenciales problemas de no poder trabajar 

<p align="justify">
Motivo por el cual se desarrollará un sistema automatizado de entradas y salidas  que integre monitoreo de registros , control de entradas y salidas del usuario  y notificaciones en tiempo real, utilizando tecnologías  
aplicaciones móviles y  optimizar sus registros 
</p>

---

## Propuesta de Solución:
<p align="justify">El sistema de alimentación automatizada para gatos se desarrollará como una solución integral que comprende los siguientes componentes:

  - Hardware (Dispositivo Físico)
    - Dispensador automático de alimento con capacidad ajustable
    - Sistema de pesaje integrado mediante célula de carga
    - Microcontrolador ESP32 para control y conectividad
    - Sensores de nivel para monitorear la cantidad de alimento restante
    - Pantalla LCD para mostrar información básica del estado
    - Indicadores LED para alertas visuales

  - Conectividad y Comunicación
    - Conexión WiFi para transmisión de datos
    - Protocolo MQTT para comunicación en tiempo real
    - Sistema de almacenamiento local para funcionamiento offline
    - API REST para comunicación entre dispositivo y servicios

  - Backend
    - Servidor Node.js para procesamiento de datos
    - Base de datos MongoDB para almacenamiento
    - Implementación de microservicios para:
      - Gestión de usuarios y autenticación
      - Procesamiento de datos de tareas visuales 
      - Sistema de notificaciones
      -  Generación de reportes
      - Agregacion de graficas 

  - Aplicación Móvil
    - Desarrollo en Flutter para compatibilidad multiplataforma
    - Interfaz intuitiva con énfasis en accesibilidad
    - Funcionalidades principales:
      - Dashboard con información en tiempo real
      - Configuración de planes de alimentación
      - Sistema de notificaciones
      - Visualización de históricos y estadísticas
      - Gestión de perfiles de mascotas

  
  - Sistema de Análisis y Control


  - Seguridad
    - Implementación de JWT para autenticación
    - Encriptación de datos sensibles
    - Sistema de respaldo automático
    - Protocolos de recuperación ante fallos

  - Proceso de Implementación
    - Fase de desarrollo de hardware y pruebas iniciales
    - Desarrollo de backend y servicios base
    - Implementación de aplicaciones móvil y web
    - Período de pruebas con usuarios beta
    - Lanzamiento controlado y monitoreo
    - Iteraciones y mejoras basadas en retroalimentación

</p>

---

## Objetivo General:

<p align="justify">Desarrollar un sistema automatizado de alimentación para gatos que integre monitoreo de peso, control de porciones y notificaciones en tiempo real, utilizando tecnologías IoT, aplicaciones móviles y web, para optimizar la nutrición y salud felina.</p>

### Objetivos Específicos:
<p align="justify">

-	Implementar un sistema de pesaje automático que registre el peso del gato durante su alimentación, utilizando sensores y tecnologías IoT.
- Desarrollar un algoritmo de control de porciones que ajuste automáticamente la cantidad de alimento basado en el peso del gato y estándares veterinarios establecidos.
- Crear una aplicación móvil multiplataforma que permita a los usuarios:
    - Recibir notificaciones sobre la alimentación y peso del gato
    - Visualizar históricos de alimentación y peso
    - Monitorear el nivel de alimento en el dispensador
- Implementar una interfaz web para la gestión y visualización de datos, orientada a la Industria 4.0, que facilite el análisis de tendencias y patrones alimenticios.
- Diseñar e implementar una arquitectura de base de datos en MongoDB que permita el almacenamiento eficiente y la recuperación de datos del sistema.
- Desarrollar una interfaz intuitiva y accesible, considerando las necesidades específicas de usuarios de edad avanzada y personas con diferentes niveles de familiaridad tecnológica.

</p>

---

## Justificación

<p align="justify">Los propietarios de gatos enfrentan dificultades para mantener alimentación consistente debido a compromisos laborales o limitaciones físicas, generando problemas de salud felina y estrés. Nuestro sistema integra tecnologías IoT para dispensar alimentos programados, monitorear peso y enviar notificaciones en tiempo real. Esta solución fue seleccionada por combinar hardware accesible con interfaces intuitivas, permitiendo control remoto y seguimiento nutricional preciso. Los beneficios son tangibles: adultos mayores mantienen sus mascotas sin esfuerzo físico, personas con horarios exigentes aseguran alimentación durante su ausencia, y los gatos reciben porciones controladas registrando datos que facilitan intervenciones veterinarias preventivas. Este desarrollo representa una innovación práctica que mejora simultáneamente la calidad de vida de propietarios y la salud de sus mascotas.

</p>

---

## Reglas de Negocio:
<p align="justify">

  - Registro y Autenticación
      - Registrar únicamente usuarios mayores de 18 años
      - Verificar la identidad del usuario mediante correo electrónico
      - Permitir la creación de múltiples perfiles de gatos por usuario
      - Mantener activa la sesión del usuario por 30 días

  - Gestión de Perfiles de Gatos
      - Registrar datos básicos del gato (nombre, edad, raza, peso inicial)
      - Actualizar automáticamente el peso del gato en cada sesión de alimentación
      - Calcular el rango de peso ideal según la raza y edad del gato
    - Notificar al usuario cuando el peso del gato esté fuera del rango saludable

  - Control de Alimentación
      - Establecer horarios de alimentación personalizados según el peso y edad del gato
      - Dispensar la cantidad de alimento según el plan nutricional calculado
      - Limitar el número de porciones diarias según el plan establecido
      - Registrar cada sesión de alimentación con fecha, hora, cantidad consumida y peso del gato

  - Alertas y Notificaciones
      - Enviar notificación al usuario después de cada sesión de alimentación
      - Alertar cuando el nivel de alimento en el dispensador sea menor al 20%
      - Notificar variaciones significativas en el peso del gato (±5% en una semana)
      - Enviar reportes semanales del comportamiento alimenticio del gato

  - Mantenimiento del Sistema
      - Realizar calibración automática de la báscula cada 24 horas
      - Verificar la conectividad del dispositivo cada 30 minutos
      - Almacenar datos offline por hasta 72 horas en caso de pérdida de conexión
      - Sincronizar datos automáticamente al restaurar la conexión

  - Seguridad y Privacidad
      - Encriptar todos los datos personales del usuario
      - Respaldar la información en la base de datos cada 24 horas
      - Mantener un historial de alimentación por al menos 12 meses
      - Permitir la exportación de datos en formatos CSV o PDF

  - Plan Nutricional
      - Calcular porciones según estándares veterinarios establecidos
      - Ajustar automáticamente las porciones según tendencias de peso
      - Permitir modificaciones manuales del plan solo con justificación
      - Registrar cambios en el plan nutricional con fecha y motivo

  - Gestión de Usuarios y Roles
      - Asignar roles diferentes para dueños principales y cuidadores secundarios
      - Permitir la transferencia de propiedad del dispositivo entre usuarios
      - Restringir acciones críticas (como cambios en el plan nutricional) solo a dueños principales
      - Limitar el número máximo de cuidadores secundarios a 3 por dispositivo

  - Mantenimiento del Dispositivo
      - Programar recordatorios de limpieza del dispensador cada 15 días
      - Registrar las fechas de mantenimiento y limpieza realizados
      - Notificar al usuario cuando se requiera mantenimiento preventivo
      - Bloquear el uso del dispositivo después de 30 días sin limpieza registrada

  - Reportes y Análisis
      - Generar gráficas de tendencias de peso mensual
      - Comparar patrones de alimentación contra estándares saludables
      - Emitir recomendaciones basadas en el análisis de datos
      - Exportar informes detallados para consulta veterinaria
</p>

--- 

## Identidad Gráfica

#### Logo del proyecto [ProTask]
![MeowMetrics](https://i.pinimg.com/736x/06/01/c8/0601c8c361d79ebc7b582694a9750fe6.jpg)

#### Logo de la empresa [Smart Pet Solutions]
![Smart Pet Solutions](https://i.pinimg.com/736x/b5/e9/78/b5e9785731b3b1e7afe6aff9ebcb031e.jpg)

###### Paleta de Colores del Proyecto:
![Paleta de Colores](https://i.pinimg.com/736x/94/6f/0c/946f0c35da07cc67506423b68a148b25.jpg)
 

---

## Lista de Tecnologías:

##### Cliente:

![ReactNative](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

##### Base de Datos:
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

##### Diseño:
![AdobeIllustrator](https://img.shields.io/badge/Adobe%20Illustrator-FF9A00?style=for-the-badge&logo=adobe%20illustrator&logoColor=white)

##### IDE:
![VisualStudioCode](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

##### OS:
![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)

##### Pruebas:
![Firefox](https://img.shields.io/badge/Firefox_Browser-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white)
![Brave](https://img.shields.io/badge/Brave-FF1B2D?style=for-the-badge&logo=Brave&logoColor=white)
![AndroidStudio](https://img.shields.io/badge/Android_Studio-3DDC84?style=for-the-badge&logo=android-studio&logoColor=white)

---

### Autores:

***Mendoza Márquez Brian Jesús***
[@BR1ANJ3Sus3B](https://github.com/BR1ANJ3Sus3B)
