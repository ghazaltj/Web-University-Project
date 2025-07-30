

const API_BASE_URL = "http://localhost:5000/api";


function getToken() {
  return localStorage.getItem("token") || null;
}

async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (!res.ok) throw new Error("خطا در دریافت محصولات");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}


async function addToCart(productId) {
  const token = getToken();
  if (!token) {
    alert("برای افزودن محصول ابتدا باید وارد شوید.");
    window.location.href = "login.html";
    return;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity: 1 }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "خطای ناشناخته");
    }
    await updateCartCount();
    alert("محصول به سبد خرید اضافه شد!");
  } catch (err) {
    console.error(err);
    alert(err.message || "خطا در افزودن محصول");
  }
}


async function updateCartCount() {
  const countEl =
    document.getElementById("cart-count") ||
    document.getElementById("num-of-cart");
  if (!countEl) return;
  const token = getToken();
  if (!token) {
    countEl.innerText = "0";
    return;
  }
  try {
    const cart = await fetchCart();
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    countEl.innerText = total.toString();
  } catch (err) {
    console.error(err);
    countEl.innerText = "0";
  }
}

/**
 * @param {string} id 
 */
async function fetchProductById(id) {
  const products = await fetchProducts();
  return products.find((p) => p._id === id || p.id === id) || null;
}


async function fetchCart() {
  const token = getToken();
  if (!token) return [];
  try {
    const res = await fetch(`${API_BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("خطا در دریافت سبد خرید");
    const cart = await res.json();
    return cart;
  } catch (err) {
    console.error(err);
    return [];
  }
}

/**
 *
 * @param {string} productId
 * @param {number} quantity 
 */
async function updateCartItem(productId, quantity) {
  const token = getToken();
  if (!token) {
    alert("برای ویرایش سبد خرید ابتدا باید وارد شوید.");
    window.location.href = "login.html";
    return [];
  }
  try {
    const res = await fetch(`${API_BASE_URL}/cart/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "خطای ناشناخته");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    alert(err.message || "خطا در به‌روزرسانی سبد خرید");
    return [];
  }
}

/**
 *
 * @param {string} productId 
 */
async function removeCartItem(productId) {
  const token = getToken();
  if (!token) {
    alert("برای حذف از سبد خرید ابتدا باید وارد شوید.");
    window.location.href = "login.html";
    return [];
  }
  try {
    const res = await fetch(`${API_BASE_URL}/cart/${productId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "خطای ناشناخته");
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    alert(err.message || "خطا در حذف از سبد خرید");
    return [];
  }
}


async function clearCartOnServer() {
  const items = await fetchCart();
  for (const item of items) {
    await removeCartItem(item.product._id || item.product.id);
  }
}


async function renderProductList() {
  const container = document.getElementById("cloth-preview");
  if (!container) return;
  container.innerHTML = "";
  const products = await fetchProducts();
  products.forEach((p) => {
    const priceFormatted = Number(p.price).toLocaleString("fa-IR");
    const imgSrc = p.image ? `Images/${p.image}` : "Images/default.jpg";
    container.innerHTML += `
      <div class="single-cloth-preview">
        <a href="product.html?id=${p._id || p.id}">
          <img src="${imgSrc}" alt="${p.name}" />
        </a>
        <p class="cloth-name">${p.name}</p>
        <span class="cloth-price">${priceFormatted} تومان</span>
        <button class="add-to-cart-button" data-id="${p._id || p.id}">افزودن به سبد خرید</button>
      </div>
    `;
  });
  const buttons = container.querySelectorAll(".add-to-cart-button");
  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      addToCart(id);
    });
  });
}


function attachDetailPageListener() {
  const detailButton = document.querySelector(".add-to-cart-button");
  if (!detailButton) return;
  detailButton.addEventListener("click", function () {
    const id = this.getAttribute("data-id");
    addToCart(id);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  renderProductList();
  attachDetailPageListener();
  updateCartCount();
});