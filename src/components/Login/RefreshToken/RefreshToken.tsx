import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshTokenForm } from '../transformData/login';
import { useAuthStore } from '../../../storage/authStore';


interface RefreshTokenModalProps {
  warningTime?: number; 
}

export function RefreshTokenModal({ warningTime = 60 }: RefreshTokenModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const navigate = useNavigate();
  const { tokens, logout, login } = useAuthStore();

  useEffect(() => {
    if (!tokens?.token || !tokens.timestamp) return;

    const sessionDuration = parseInt(tokens.timestamp, 10); 
    const tokenParts = tokens.token.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));
    const startTime = payload.iat * 1000; 
    const expirationTime = startTime + (sessionDuration * 1000); 
    
    // Si el token ya expiró, cerrar sesión inmediatamente
    if (Date.now() >= expirationTime) {
      logout();
      navigate('/login');
      return;
    }

    const warningThreshold = expirationTime - (warningTime * 10000);
    
    // Solo configurar el temporizador si aún no es tiempo de mostrar la advertencia
    if (Date.now() < warningThreshold) {
      const warningTimeout = setTimeout(() => {
        setShowModal(true);
        setTimeLeft(Math.floor((expirationTime - Date.now()) / 1000));
      }, warningThreshold - Date.now());

      // Configurar el temporizador para la cuenta regresiva
      const countdownInterval = setInterval(() => {
        const remaining = Math.floor((expirationTime - Date.now()) / 1000);
        if (remaining <= 0) {
          logout();
          navigate('/login');
        } else {
          setTimeLeft(remaining);
        }
      }, 1000);

      return () => {
        clearTimeout(warningTimeout);
        clearInterval(countdownInterval);
      };
    }
  }, [tokens, warningTime, logout, navigate]);

  const handleRefresh = async () => {
    try {
      if (tokens?.refresh_token) {
        const newToken = await refreshTokenForm(tokens.refresh_token);
        login(
          newToken.user,
          newToken.tokens,
        );
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold text-[#25215F] mb-4">
          ¡Su sesión está por expirar!
        </h2>
        <p className="text-gray-600 mb-4">
          Su sesión expirará en {timeLeft} segundos. ¿Desea mantener la sesión activa?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cerrar sesión
          </button>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-[#25215F] text-white rounded-lg hover:bg-[#1c1847] transition-colors"
          >
            Mantener sesión
          </button>
        </div>
      </div>
    </div>
  );
}