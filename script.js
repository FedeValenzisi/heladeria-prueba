import { getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const db = window.db; // Utilizar la instancia de Firestore del HTML
        
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

    } catch (error) {
        console.log("Error getting documents: ", error);
    }
});
