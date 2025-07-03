import { ArrowLeft, Shield } from '@phosphor-icons/react';

import { useNavigate } from 'react-router-dom';

export function PageUnauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-3 rounded-full">
            <Shield className="w-12 h-12 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Acceso No Autorizado
        </h1>
        
        <p className="text-gray-600 mb-8">
          Lo sentimos, no tienes permisos para acceder a esta página. Por favor, contacta al administrador si crees que esto es un error.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver atrás
          </button>
          
          <button
            onClick={() => navigate('/login')}
            className="w-full px-4 py-2 bg-[#25215F] text-white rounded-lg hover:bg-[#1c1847] transition-colors"
          >
            Ir al inicio de sesión
          </button>
        </div>
      </div>
    </div>
  );
}