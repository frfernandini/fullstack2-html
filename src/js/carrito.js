function mostrarCarrito() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    if (!cartItems || !totalPrice) return;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    cartItems.innerHTML = "";
    let total = 0;

    carrito.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("card", "mb-2", "p-2");
        div.innerHTML = `
            <h5>${prod.Titulo}</h5>
            <p>$${prod.Precio.toLocaleString()}</p>
        `;
        cartItems.appendChild(div);
        total += prod.Precio;
    });

    totalPrice.textContent = "$" + total.toLocaleString();
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);

