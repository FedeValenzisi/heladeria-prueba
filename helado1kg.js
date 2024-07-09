import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const db = window.db; // Utilizar la instancia de Firestore del HTML

        const gustosSnapshot = await getDocs(collection(db, "gustos"));
        const gustosList = document.getElementById("gustos");

        gustosSnapshot.forEach((doc) => {
            const gusto = doc.data().nombre;

            // Crear un contenedor para el checkbox y la etiqueta
            const listItem = document.createElement("div");

            // Crear el checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = gusto;
            checkbox.name = "gustos";
            checkbox.value = gusto;
            checkbox.classList.add("gusto-checkbox");

            // Crear la etiqueta
            const label = document.createElement("label");
            label.htmlFor = gusto;
            label.innerText = gusto;
            label.classList.add("gusto-label");

            // Añadir el checkbox y la etiqueta al contenedor
            listItem.appendChild(checkbox);
            listItem.appendChild(label);

            // Añadir el contenedor a la lista de gustos
            gustosList.appendChild(listItem);
        });

        // Añadir evento para limitar la selección a 4 gustos
        gustosList.addEventListener("change", function() {
            const checkboxes = gustosList.querySelectorAll('input[type="checkbox"]');
            const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

            checkboxes.forEach(checkbox => {
                if (checkedCount >= 4 && !checkbox.checked) {
                    checkbox.disabled = true;
                } else {
                    checkbox.disabled = false;
                }
            });
        });

    } catch (error) {
        console.log("Error getting documents: ", error);
    }
});