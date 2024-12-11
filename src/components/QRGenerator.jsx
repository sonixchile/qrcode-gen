import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRGenerator = () => {
  const [url, setUrl] = useState('');
  const [qrSize, setQrSize] = useState(256);
  const [qrColor, setQrColor] = useState('#000000');

  const handleGenerate = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Generador de Códigos QR</h1>
        
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL o Texto</label>
            <input 
              type="text" 
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Ingresa URL o texto"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700">Tamaño</label>
              <input 
                type="number" 
                id="size"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                min="100"
                max="500"
                disabled
              />
            </div>

            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
              <input 
                type="color" 
                id="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="mt-1 block w-full h-10 p-0 border-0 rounded-md"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Generar QR
          </button>
        </form>

        {url && (
          <div className="mt-6 flex flex-col items-center">
            <QRCodeSVG 
              value={url} 
              size={qrSize}
              fgColor={qrColor}
              className="mb-4"
            />
            <button 
              onClick={() => {
                const svg = document.querySelector('svg');
                const svgData = new XMLSerializer().serializeToString(svg);
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const img = new Image();
                img.onload = () => {
                  canvas.width = img.width;
                  canvas.height = img.height;
                  ctx.drawImage(img, 0, 0);
                  const pngFile = canvas.toDataURL("image/png");
                  const downloadLink = document.createElement("a");
                  downloadLink.download = "QR_Code";
                  downloadLink.href = `${pngFile}`;
                  downloadLink.click();
                };
                img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
              }}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Descargar QR
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRGenerator;