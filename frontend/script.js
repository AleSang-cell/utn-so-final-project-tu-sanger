document.getElementById("loadButton").addEventListener("click", async () => {
  const response = await fetch("/api/students");
  const students = await response.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
    tbody.appendChild(row);
  });
});
document.getElementById("addButton").addEventListener("click", async () => {
  const name = document.getElementById("studentInput").value;
  if (!name) return;
  
  const response = await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  
  if (response.ok) {
    document.getElementById("studentInput").value = "";
    // Recargar la tabla automáticamente
    document.getElementById("loadButton").click();
  }
});

