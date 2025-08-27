let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, quantity) {
  // Find if the product already exists in cart
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity
    });
  }

  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}

// Load the cart quantity when the page loads
document.addEventListener('DOMContentLoaded', () => {
  updateCartQuantity();
});

// Add ONE event listener to the parent grid
document.querySelector('.js-productGrid').addEventListener('click', (event) => {
  // The 'event.target' is the exact element that was clicked
  const target = event.target;

  // Check if the element that was clicked has the class 'js-add-to-cart'
  if (target.classList.contains('js-add-to-cart')) {
    const button = target;
    const productId = button.dataset.productId;
    const quantitySelector = button.closest('.product-container')
      .querySelector('.js-quantity-selector');
    const quantity = Number(quantitySelector.value);

    // Add the clicked product into cart
    addToCart(productId, quantity);

    // Update the quantity showing in cart
    updateCartQuantity();

    // Show the "Added" message
    const addedMessage = button.closest('.product-container')
      .querySelector('.added-to-cart');
    addedMessage.classList.add('added-to-cart-visible');

    setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible');
    }, 2000);
  }
});