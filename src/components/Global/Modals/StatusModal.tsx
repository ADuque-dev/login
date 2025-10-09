import React from 'react';
import { CheckCircle, XCircle, X } from '@phosphor-icons/react';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message: string;
}

const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            {type === 'success' ? (
              <CheckCircle size={24} className="text-green-500" weight="fill" />
            ) : (
              <XCircle size={24} className="text-red-500" weight="fill" />
            )}
            <h3 className="text-lg font-semibold text-[#25215F]">{title}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6 ml-9">{message}</p>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#25215F] text-white rounded-lg hover:bg-[#3a3480]"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;