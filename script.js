const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 1999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 3,
        name: "Casual T-Shirt",
        category: "fashion",
        price: 699,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        id: 4,
        name: "Men's Sneakers",
        category: "fashion",
        price: 1799,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 5,
        name: "Backpack",
        category: "accessories",
        price: 1299,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },
    {
        id: 6,
        name: "Sunglasses",
        category: "accessories",
        price: 899,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cartItems = document.getElementById("cartItems");
const totalItems = document.getElementById("totalItems");
const grandTotal = document.getElementById("grandTotal");
const clearCartBtn = document.getElementById("clearCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");

function displayProducts(productList) {
    if (!productGrid) return;

    productGrid.innerHTML = "";

    if (productList.length === 0) {
        productGrid.innerHTML = "<h2>No products found.</h2>";
        return;
    }

    productList.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>Category: ${product.category}</p>
                    <p class="price">₹${product.price}</p>
                    <button onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    });
}

function filterProducts() {
    if (!searchInput || !categoryFilter) return;

    const searchValue = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchValue);
        const matchesCategory =
            categoryValue === "all" || product.category === categoryValue;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
}

function addToCart(productId) {
    const selectedProduct = products.find(product => product.id === productId);

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...selectedProduct,
            quantity: 1
        });
    }

    saveCart();
    alert("Product added to cart successfully!");
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <tr>
                <td colspan="6">Your cart is empty.</td>
            </tr>
        `;

        if (totalItems) totalItems.textContent = 0;
        if (grandTotal) grandTotal.textContent = 0;
        return;
    }

    let itemsCount = 0;
    let totalAmount = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;

        itemsCount += item.quantity;
        totalAmount += itemTotal;

        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>₹${item.price}</td>
                <td>${item.quantity}</td>
                <td>₹${itemTotal}</td>
                <td>
                    <button onclick="removeFromCart(${item.id})">
                        Remove
                    </button>
                </td>
            </tr>
        `;
    });

    if (totalItems) totalItems.textContent = itemsCount;
    if (grandTotal) grandTotal.textContent = totalAmount;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    displayCart();
}

if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", filterProducts);
}

if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Cart is already empty.");
            return;
        }

        cart = [];
        saveCart();
        displayCart();
        alert("Cart cleared successfully.");
    });
}

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        alert("Thank you! Your order has been placed successfully.");
        cart = [];
        saveCart();
        displayCart();
    });
}

displayProducts(products);
displayCart();