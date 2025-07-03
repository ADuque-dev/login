import React from "react";

interface ModalConfirmationProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  cancelText?: string;
  confirmText?: string;
  cancelButtonColor?: string;
  cancelTextColor?: string;
  confirmButtonColor?: string;
  confirmTextColor?: string;
  messageBackgroundColor?: string;
  messageTextColor?: string;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  show,
  onClose,
  onConfirm,
  message,
  cancelText = "Cancelar",
  confirmText = "Aceptar",
  cancelButtonColor = "bg-custom-dark-blue",
  cancelTextColor = "text-white",
  confirmButtonColor = "bg-custom-light-gray",
  confirmTextColor = "text-black",
  messageBackgroundColor = "",
  messageTextColor = "custom-gray-500",
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="rounded-2xl shadow-lg p-8 bg-white"
        style={{ width: "449px", height: "203px" }}
      >
        <p
          className={`text-center font-libre-franklin font-medium mt-5 text-sm leading-[18px] mb-4 p-2 rounded-lg ${messageBackgroundColor} ${messageTextColor}`}
        >
          {message}
        </p>
        <div className="flex space-x-4">
          {/* Botón de cancelar */}
          <button
            onClick={onClose}
            className={`w-full px-4 py-2 rounded-lg ${cancelButtonColor} ${cancelTextColor} hover:opacity-90`}
          >
            {cancelText}
          </button>

          {/* Botón de confirmar */}
          <button
            onClick={onConfirm}
            className={`w-full px-4 py-2 rounded-lg ${confirmButtonColor} ${confirmTextColor} hover:opacity-90`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmation;
