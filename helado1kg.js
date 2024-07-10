import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const db = window.db; // Utilizar la instancia de Firestore del HTML

        const gustosSnapshot = await getDocs(collection(db, "gustos"));
        const gustosList = document.getElementById("gustos");

        let totalGustos = 0;

        gustosSnapshot.forEach((doc) => {
            const gusto = doc.data().nombre;

            // Crear un contenedor para el gusto y los botones
            const listItem = document.createElement("div");
            listItem.classList.add("gusto-item");

            // Crear un contenedor para los botones y el contador
            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("button-container");

            // Crear el botón de decremento
            const decrementButton = document.createElement("button");
            decrementButton.innerText = "-";
            decrementButton.classList.add("decrement-button");

            // Crear el contador
            const counter = document.createElement("span");
            counter.innerText = "0";
            counter.classList.add("gusto-counter");

            // Crear el botón de incremento
            const incrementButton = document.createElement("button");
            incrementButton.innerText = "+";
            incrementButton.classList.add("increment-button");

            // Añadir los botones y el contador al contenedor de botones
            buttonContainer.appendChild(decrementButton);
            buttonContainer.appendChild(counter);
            buttonContainer.appendChild(incrementButton);

            // Crear la etiqueta del gusto
            const label = document.createElement("span");
            label.innerText = gusto;
            label.classList.add("gusto-label");

            // Añadir la etiqueta y el contenedor de botones al contenedor del gusto
            listItem.appendChild(label);
            listItem.appendChild(buttonContainer);

            // Añadir el contenedor a la lista de gustos
            gustosList.appendChild(listItem);

            // Añadir eventos a los botones
            incrementButton.addEventListener("click", function() {
                if (totalGustos < 4) {
                    const currentCount = parseInt(counter.innerText);
                    counter.innerText = currentCount + 1;
                    totalGustos++;
                    updateButtons();
                }
            });

            decrementButton.addEventListener("click", function() {
                const currentCount = parseInt(counter.innerText);
                if (currentCount > 0) {
                    counter.innerText = currentCount - 1;
                    totalGustos--;
                    updateButtons();
                }
            });
        });

        function updateButtons() {
            const incrementButtons = gustosList.querySelectorAll('.increment-button');
            incrementButtons.forEach(button => {
                if (totalGustos >= 4) {
                    button.disabled = true;
                } else {
                    button.disabled = false;
                }
            });
        }

    } catch (error) {
        console.log("Error getting documents: ", error);
    }
});