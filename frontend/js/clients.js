// Crear cliente
document.getElementById("clientForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("clientName").value;
  const phone = document.getElementById("clientPhone").value;
  const email = document.getElementById("clientEmail").value;

  const token = localStorage.getItem("token"); // Obtiene el token desde localStorage

  if (!token) {
    alert("Por favor, inicie sesión primero.");
    return;
  }

  const res = await fetch("http://localhost:3000/api/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // Incluye el token en el encabezado
    },
    body: JSON.stringify({ name, phone, email }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Cliente creado exitosamente");
    loadClients();
  } else {
    alert(data.message || "Error al crear el cliente");
  }
});
