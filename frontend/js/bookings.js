// Crear reserva
document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const clientId = document.getElementById("clientSelect").value;
  const serviceId = document.getElementById("serviceSelect").value;
  const date = document.getElementById("date").value;

  const res = await fetch("http://localhost:3000/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ client_id: clientId, service_id: serviceId, date }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Reserva creada exitosamente");
    loadBookings();
  } else {
    alert(data.message);
  }
});

// Cargar reservas
async function loadBookings() {
  const res = await fetch("http://localhost:3000/bookings", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const bookings = await res.json();
  const tbody = document.querySelector("#bookingTable tbody");
  tbody.innerHTML = "";
  bookings.forEach((booking) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${booking.client_name}</td><td>${booking.service_name}</td><td>${booking.date}</td>`;
    tbody.appendChild(tr);
  });
}

loadBookings();

// Cargar clientes y servicios para los selects
async function loadSelectOptions() {
  const [clientsRes, servicesRes] = await Promise.all([
    fetch("http://localhost:3000/clients", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }),
    fetch("http://localhost:3000/services", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }),
  ]);

  const [clients, services] = await Promise.all([clientsRes.json(), servicesRes.json()]);
  const clientSelect = document.getElementById("clientSelect");
  const serviceSelect = document.getElementById("serviceSelect");

  clients.forEach((client) => {
    const option = document.createElement("option");
    option.value = client.id;
    option.textContent = client.name;
    clientSelect.appendChild(option);
  });

  services.forEach((service) => {
    const option = document.createElement("option");
    option.value = service.id;
    option.textContent = service.name;
    serviceSelect.appendChild(option);
  });
}

loadSelectOptions();

  