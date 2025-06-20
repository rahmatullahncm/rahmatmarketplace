// script.js

// js/script.js
function addToCart(id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ id, name, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`✅ ${name} added to cart!`);
}


function loadCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-items");

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += parseFloat(item.price);
    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div>
          <h4>${item.name}</h4>
          <p>৳${item.price}</p>
        </div>
      </div>
    `;
  });

  document.getElementById("total-price").innerText = "Total: ৳" + total;
}
// script.js
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}
window.onload = updateCartCount;
document.addEventListener("DOMContentLoaded", () => {
  const paymentMethod = document.getElementById("payment-method");
  const trxSection = document.getElementById("trx-section");

  paymentMethod.addEventListener("change", () => {
    if (paymentMethod.value === "bkash" || paymentMethod.value === "nagad") {
      trxSection.style.display = "block";
      document.getElementById("trx-id").required = true;
    } else {
      trxSection.style.display = "none";
      document.getElementById("trx-id").required = false;
    }
  });

  // Submit
  document.getElementById("payment-form").addEventListener("submit", e => {
    e.preventDefault();

    const trxId = document.getElementById("trx-id").value;
    const method = paymentMethod.value;

    if ((method === "bkash" || method === "nagad") && trxId.trim() === "") {
      alert("Please enter the transaction ID.");
      return;
    }

    alert("✅ Order confirmed! TRX ID: " + trxId + " (demo only)");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
});
