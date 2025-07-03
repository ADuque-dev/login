import React from "react";

interface DocumentViewerProps {
  show: boolean;
  onClose: () => void;
  documentUrl: string;
  documentTitle?: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  show,
  onClose,
  documentUrl,
  documentTitle = "Documento",
}) => {
  if (!show) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = documentUrl;
    link.download = documentTitle;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 shadow-lg w-[80%] h-[80%]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{documentTitle}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            Cerrar
          </button>
        </div>
        <div className="flex-1 overflow-auto h-[80%]">
          <iframe
            src={documentUrl}
            title={documentTitle}
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
