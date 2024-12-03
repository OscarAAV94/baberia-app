// Crear servicio
document.getElementById("serviceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const name = document.getElementById("serviceName").value;
    const price = document.getElementById("servicePrice").value;
  
    const res = await fetch("http://localhost:3000/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, price }),
    });
  
    const data = await res.json();
    if (res.ok) {
      alert("Servicio creado exitosamente");
      loadServices();
    } else {
      alert(data.message);
    }
  });
  
  // Cargar servicios
  async function loadServices() {
    const res = await fetch("http://localhost:3000/services", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  
    const services = await res.json();
    const tbody = document.querySelector("#serviceTable tbody");
    tbody.innerHTML = "";
    services.forEach((service) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${service.name}</td><td>${service.price}</td>`;
      tbody.appendChild(tr);
    });
  }
  
  loadServices();
  