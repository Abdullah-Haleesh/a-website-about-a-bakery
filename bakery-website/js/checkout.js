// Cart items array to store the cart data
let cartItems = [];

// Load cart items when page loads
window.onload = function() {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        renderCart();
    }
};

// Remove item from cart
function removeItem(itemId) {
    cartItems = cartItems.filter(item => item.id != itemId);
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderCart();
}

// Update quantity
function updateQuantity(itemId, change) {
    const item = cartItems.find(item => item.id == itemId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCart();
    }
}

// Calculate total
function calculateTotal() {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Render cart items
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    cartItems.forEach(item => {
        const itemElement = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;
        cartContainer.innerHTML += itemElement;
    });

    // Update total
    document.getElementById('total-amount').textContent = calculateTotal().toFixed(2);
}

// Process checkout
function processCheckout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    // Clear cart after successful checkout
    localStorage.removeItem('cart');
    cartItems = [];
    alert('Proceeding to payment...');
}
