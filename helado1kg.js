import { getDocs, collection, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const db = window.db;

        // Mostrar el spinner y ocultar el contenido al comenzar la carga
        const loadingElement = document.getElementById("loading");
        const contentElement = document.getElementById("content");
        loadingElement.classList.remove("hidden");
        contentElement.classList.add("hidden");
        
        // Determinar el tipo de helado basándose en el título de la página
        const title = document.querySelector('header h1').innerText;
        let heladoType;
        let maxGustos;
        if (title.includes('1kg')) {
            heladoType = "helado1kg";
            maxGustos = 4;
        } else if (title.includes('1/2kg')) {
            heladoType = "helado1-2kg";
            maxGustos = 3;
        } else if (title.includes('1/4kg')) {
            heladoType = "helado1-4kg";
            maxGustos = 3;
        } else {
            console.log("Tipo de helado no reconocido.");
            return;
        }

        // Obtener el precio del helado
        const precioDoc = await getDoc(doc(db, "precios", heladoType));
        let precio = 0;
        if (precioDoc.exists()) {
            precio = precioDoc.data().precio;
            document.getElementById("product-price").innerText = `Producto: $${precio.toFixed(2)}`;
        } else {
            console.log(`No se encontró el precio del ${heladoType} en la base de datos.`);
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
                if (totalGustos < maxGustos) {
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
                button.disabled = totalGustos >= maxGustos;
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
            carrito.push({ item: title, gustos: selectedGustos, precio: precio });
            localStorage.setItem("carrito", JSON.stringify(carrito));

            window.location.href = "index.html";
        });

        document.getElementById("cancel-order").addEventListener("click", function() {
            window.location.href = "index.html";
        });

        // Ocultar el spinner y mostrar el contenido al terminar la carga
        loadingElement.classList.add("hidden");
        contentElement.classList.remove("hidden");

    } catch (error) {
        console.log("Error getting documents: ", error);
    }
});
