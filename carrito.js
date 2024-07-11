document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalCartPrice = document.getElementById("total-cart-price");

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalPrice = 0;

    carrito.forEach(item => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("cart-item");

        const itemTitle = document.createElement("h3");
        itemTitle.innerText = item.item;

        const gustosList = document.createElement("ul");
        item.gustos.forEach(gusto => {
            const gustoItem = document.createElement("li");
            gustoItem.innerText = `${gusto.gusto} x${gusto.cantidad}`;
            gustosList.appendChild(gustoItem);
        });

        const itemPrice = document.createElement("p");
        itemPrice.innerText = `Precio: $${item.precio.toFixed(2)}`;

        itemContainer.appendChild(itemTitle);
        itemContainer.appendChild(gustosList);
        itemContainer.appendChild(itemPrice);

        cartItemsContainer.appendChild(itemContainer);

        totalPrice += item.precio;
    });

    totalCartPrice.innerText = `Total del Carrito: $${totalPrice.toFixed(2)}`;

    document.getElementById("confirm-order").addEventListener("click", function() {
        alert("Pedido confirmado!");
        localStorage.removeItem("carrito");
        window.location.href = "index.html";
    });

    document.getElementById("clear-cart").addEventListener("click", function() {
        localStorage.removeItem("carrito");
        window.location.reload();
    });
});
