import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const db = window.db;
        
        const precioKiloDoc = await getDoc(doc(db, "precios", "helado1kg"));
        let precioKilo = 0;
        if (precioKiloDoc.exists()) {
            precioKilo = precioKiloDoc.data().precio;
            document.getElementById("product-price").innerText = `Producto: $${precioKilo.toFixed(2)}`;
        } else {
            console.log("No se encontró el precio del kilo de helado en la base de datos.");
            return;
        }

        const gustosSnapshot = await getDocs(collection(db, "gustos"));
        const gustosList = document.getElementById("gustos");

        let totalGustos = 0;

        gustosSnapshot.forEach((doc) => {
            const gusto = doc.data().nombre;
            const listItem = document.createElement("div");
            listItem.classList.add("gusto-item");

            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("button-container");

            const decrementButton = document.createElement("button");
            decrementButton.innerText = "-";
            decrementButton.classList.add("decrement-button");

            const counter = document.createElement("span");
            counter.innerText = "0";
            counter.classList.add("gusto-counter");

            const incrementButton = document.createElement("button");
            incrementButton.innerText = "+";
            incrementButton.classList.add("increment-button");

            buttonContainer.appendChild(decrementButton);
            buttonContainer.appendChild(counter);
            buttonContainer.appendChild(incrementButton);

            const label = document.createElement("span");
            label.innerText = gusto;
            label.classList.add("gusto-label");

            listItem.appendChild(label);
            listItem.appendChild(buttonContainer);

            gustosList.appendChild(listItem);

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
                button.disabled = totalGustos >= 4;
            });
        }

        document.getElementById("add-to-order").addEventListener("click", function() {
            const selectedGustos = [];
            gustosList.querySelectorAll('.gusto-item').forEach(item => {
                const label = item.querySelector('.gusto-label').innerText;
                const count = parseInt(item.querySelector('.gusto-counter').innerText);
                if (count > 0) {
                    selectedGustos.push({ gusto: label, cantidad: count });
                }
            });

            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            carrito.push({ item: "1kg de helado", gustos: selectedGustos, precio: precioKilo });
            localStorage.setItem("carrito", JSON.stringify(carrito));

            window.location.href = "index.html";
        });

        document.getElementById("cancel-order").addEventListener("click", function() {
            window.location.href = "index.html";
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
