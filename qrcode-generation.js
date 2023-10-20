const qr = require('qr-image');

// Función para generar un código QR a partir de una URL
function generateQRCode(url) {
  try {
    // Crea un código QR con la URL proporcionada
    const qrCode = qr.image(url, { type: 'png' });
    return qrCode;
  } catch (error) {
    console.error('Error al generar el código QR:', error);
    return null;
  }
}

module.exports = generateQRCode;
