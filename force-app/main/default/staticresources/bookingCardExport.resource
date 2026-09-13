/* Render deterministic booking data, never generated text or substitute photos. */
(async function () {
  'use strict';
  // Visualforce may move included scripts into the head. Wait before reading DOM nodes.
  if (document.readyState === 'loading') {
    await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, { once: true }));
  }
  const status = document.getElementById('export-status');
  const button = document.getElementById('download-card');
  const canvas = document.getElementById('booking-canvas');
  try {
    const error = document.getElementById('booking-error').textContent;
    if (error) throw new Error(error);
    const booking = JSON.parse(document.getElementById('booking-payload').textContent);
    if (!booking.isSuccess) throw new Error('Booking details are unavailable.');
    const imageData = document.getElementById('booking-photo').textContent;
    let image;
    if (booking.hasImage) {
      if (!imageData.startsWith('data:image/')) throw new Error('The experience photo is unavailable.');
      image = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('The experience photo could not be decoded.'));
        img.src = imageData;
      });
    }
    const width = 1200, margin = 64, textWidth = width - margin * 2;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('This browser cannot export a booking image.');
    const rows = [];
    let y = 72;
    function text(value, size, weight, color) {
      ctx.font = `${weight} ${size}px Arial, sans-serif`;
      // Wrap even long words so names and references remain inside the card.
      let line = '';
      for (const char of String(value ?? 'Not provided')) {
        if (char === '\n' || (line && ctx.measureText(line + char).width > textWidth)) {
          rows.push({ value: line, y, size, weight, color });
          y += size * 1.4;
          line = '';
          if (char === '\n') continue;
        }
        line += char;
      }
      rows.push({ value: line, y, size, weight, color });
      y += size * 1.4 + 14;
    }
    text('CORAL CLOUD RESORTS', 25, 'bold', '#58d4cb');
    text('Booking confirmation', 48, 'bold', '#ffffff');
    const photoY = y;
    const photoHeight = image ? Math.round(textWidth * image.naturalHeight / image.naturalWidth) : 90;
    y += photoHeight + 42;
    text(booking.experienceName, 40, 'bold', '#ffffff');
    text('Booked for: ' + (booking.contactName || 'Not provided'), 30, 'normal', '#ffffff');
    for (const [label, value] of [
      ['Booking', booking.bookingReference], ['Status', booking.bookingStatus],
      ['Date', booking.sessionDate],
      ['Time', `${booking.startTime || 'Not provided'}–${booking.endTime || 'Not provided'} (${booking.timeZone})`],
      ['Guests', booking.guestCount],
      ['Total', `${booking.currencyCode || ''} ${booking.totalPrice == null ? 'Not provided' : Number(booking.totalPrice).toFixed(2)}`]
    ]) text(`${label}: ${value ?? 'Not provided'}`, 28, 'normal', '#d8e8e7');
    text('Saved booking snapshot • ' + new Date().toISOString(), 18, 'normal', '#9cbab8');
    canvas.width = width;
    canvas.height = Math.ceil(y + 40);
    ctx.fillStyle = '#143333';
    ctx.fillRect(0, 0, width, canvas.height);
    if (image) ctx.drawImage(image, margin, photoY, textWidth, photoHeight);
    else {
      ctx.fillStyle = '#d8e8e7'; ctx.font = '28px Arial';
      ctx.fillText('Experience image unavailable', margin, photoY + 40);
    }
    for (const row of rows) {
      ctx.font = `${row.weight} ${row.size}px Arial, sans-serif`;
      ctx.fillStyle = row.color;
      ctx.fillText(row.value, margin, row.y);
    }
    button.disabled = false;
    status.textContent = 'Your card is ready. The download includes the photo and all booking details shown below.';
    button.addEventListener('click', () => {
      canvas.toBlob(async jpeg => {
        try {
          if (!jpeg) throw new Error('PDF export failed. Please reload and try again.');
          const bytes = new Uint8Array(await jpeg.arrayBuffer());
          const pdf = createBookingPdf(bytes, canvas.width, canvas.height);
          const url = URL.createObjectURL(pdf);
          const link = document.createElement('a');
          link.href = url;
          link.download = String(booking.bookingReference || 'booking').replace(/[^A-Za-z0-9_-]/g, '_') + '.pdf';
          document.body.appendChild(link); link.click(); link.remove();
          setTimeout(() => URL.revokeObjectURL(url), 10000);
        } catch (error) { status.textContent = error.message; }
      }, 'image/jpeg', 0.95);
    });
  } catch (error) {
    status.textContent = error.message || 'The booking card could not be prepared.';
    canvas.hidden = true;
  }
})();

// A single-page PDF embedding the complete card image, with proportional sizing.
// Offsets are measured in bytes, including binary JPEG data, for a valid xref.
function createBookingPdf(jpeg, pixelWidth, pixelHeight) {
  const encode = value => new TextEncoder().encode(value);
  const width = 595.28;
  const height = Number((width * pixelHeight / pixelWidth).toFixed(2));
  const parts = [], offsets = [0];
  let length = 0;
  const append = value => { const bytes = typeof value === 'string' ? encode(value) : value; parts.push(bytes); length += bytes.length; };
  const object = (id, body) => { offsets[id] = length; append(`${id} 0 obj\n${body}\nendobj\n`); };
  append('%PDF-1.4\n');
  object(1, '<< /Type /Catalog /Pages 2 0 R >>');
  object(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  object(3, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /XObject << /Card 4 0 R >> >> /Contents 5 0 R >>`);
  offsets[4] = length;
  append(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${pixelWidth} /Height ${pixelHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);
  append(jpeg); append('\nendstream\nendobj\n');
  const commands = `q\n${width} 0 0 ${height} 0 0 cm\n/Card Do\nQ\n`;
  object(5, `<< /Length ${encode(commands).length} >>\nstream\n${commands}endstream`);
  const xref = length;
  append('xref\n0 6\n0000000000 65535 f \n');
  for (let i = 1; i <= 5; i++) append(`${String(offsets[i]).padStart(10, '0')} 00000 n \n`);
  append(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  return new Blob(parts, { type: 'application/pdf' });
}
