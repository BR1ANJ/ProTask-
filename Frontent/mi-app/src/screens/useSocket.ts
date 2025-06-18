// hooks/useSocket.ts
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://192.168.1.160:4000'; // Ajusta la IP si cambia

export const useSocket = (onNewReporte: (data: any) => void) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('🔌 Conectado al servidor Socket.IO');
    });

    socket.on('nuevo-reporte', (reporte) => {
      console.log('📥 Nuevo reporte recibido:', reporte);
      onNewReporte(reporte); // función que tú defines para agregarlo a tu lista
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [onNewReporte]);

  return socketRef.current;
};
