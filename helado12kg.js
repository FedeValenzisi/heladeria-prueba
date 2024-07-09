import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const db = window.db; // Utilizar la instancia de Firestore del HTML

        const gustosSnapshot = await getDocs(collection(db, "gustos"));
        const gustosList = document.getElementById("gustos");

        gustosSnapshot.forEach((doc) => {
            const gusto = doc.data().nombre;
            const listItem = document.createElement("div");
            listItem.innerText = gusto;
            gustosList.appendChild(listItem);
        });
    } catch (error) {
        console.log("Error getting documents: ", error);
    }
});
