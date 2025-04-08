let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    const quantityInput = document.querySelector(`input[data-product="${name}"]`);
    const quantity = parseInt(quantityInput.value);
    if (quantity > 0) {
        cart.push({ name, price, quantity });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        showNotification(`Added ${quantity} ${name} to cart!`);
        quantityInput.value = 1;
    }
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.style.transform = 'scale(1.3)';
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        setTimeout(() => cartCount.style.transform = 'scale(1)', 200);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

function incrementQuantity(productName) {
    const input = document.querySelector(`input[data-product="${productName}"]`);
    input.value = parseInt(input.value) + 1;
}

function decrementQuantity(productName) {
    const input = document.querySelector(`input[data-product="${productName}"]`);
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Add click handler to cart
document.getElementById('cart').addEventListener('click', function() {
    window.location.href = 'checkout.html';
});