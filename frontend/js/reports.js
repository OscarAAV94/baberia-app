document.getElementById("getReportsBtn").addEventListener("click", async () => {
    const response = await fetch("http://localhost:3000/bookings");
    const bookings = await response.json();
    let reportHTML = "<h2>Reporte de Reservas</h2><ul>";
    
    bookings.forEach(booking => {
      reportHTML += `
        <li>Cliente ID: ${booking.client_id} - Fecha: ${booking.date} - Servicio: ${booking.service}</li>
      `;
    });
    
    reportHTML += "</ul>";
    document.getElementById("reportResults").innerHTML = reportHTML;
  });
  