document.addEventListener("DOMContentLoaded", function() {
    var db = firebase.firestore();

    db.collection("precios").doc("helado1kg").get().then(function(doc) {
        if (doc.exists) {
            document.getElementById("item1").innerText += " - $" + doc.data().precio;
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    db.collection("precios").doc("helado1/2kg").get().then(function(doc) {
        if (doc.exists) {
            document.getElementById("item2").innerText += " - $" + doc.data().precio;
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    db.collection("precios").doc("helado1/4kg").get().then(function(doc) {
        if (doc.exists) {
            document.getElementById("item3").innerText += " - $" + doc.data().precio;
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
});
