import { getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const db = window.db; // Utilizar la instancia de Firestore del HTML
        
        // Mostrar el spinner y ocultar el contenido al comenzar la carga
        const loadingElement = document.getElementById("loading");
        const contentElement = document.getElementById("content");
        loadingElement.classList.remove("hidden");
        contentElement.classList.add("hidden");

        const helado1kgDoc = await getDoc(doc(db, "precios", "helado1kg"));
        if (helado1kgDoc.exists()) {
            document.getElementById("item1").innerText += " - $" + helado1kgDoc.data().precio;
        } else {
            console.log("No such document!");
        }

        const helado12kgDoc = await getDoc(doc(db, "precios", "helado1-2kg"));
        if (helado12kgDoc.exists()) {
            document.getElementById("item2").innerText += " - $" + helado12kgDoc.data().precio;
        } else {
            console.log("No such document!");
        }

        const helado14kgDoc = await getDoc(doc(db, "precios", "helado1-4kg"));
        if (helado14kgDoc.exists()) {
            document.getElementById("item3").innerText += " - $" + helado14kgDoc.data().precio;
        } else {
            console.log("No such document!");
        }

        // Agregar eventos de click a los elementos del menú
        document.getElementById("kilo").addEventListener("click", function() {
            window.location.href = "helado1kg.html";
        });

        document.getElementById("medio").addEventListener("click", function() {
            window.location.href = "helado12kg.html";
        });

        document.getElementById("cuarto").addEventListener("click", function() {
            window.location.href = "helado14kg.html";
        });

        // Ocultar el spinner y mostrar el contenido al terminar la carga
        loadingElement.classList.add("hidden");
        contentElement.classList.remove("hidden");

    } catch (error) {
        console.log("Error getting documents: ", error);
    }

    document.getElementById("view-cart").addEventListener("click", function() {
        window.location.href = "carrito.html";
    });

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalPriceElement = document.getElementById("bottom-total-price");
    const totalItemsElement = document.getElementById("bottom-total-items");

    function updateBottomBar() {
        const total = carrito.reduce((acc, item) => acc + (item.precio * (item.cantidad || 1)), 0); // Ensure quantity defaults to 1 if undefined
        const totalItems = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0); // Ensure quantity defaults to 1 if undefined
        totalPriceElement.innerText = `Total: $${total.toFixed(2)}`;
        totalItemsElement.innerText = `Items: ${totalItems}`;
    }

    updateBottomBar();
});