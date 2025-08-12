const cart = [];

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

    // Find if the product already exists in cart
    let matchingItem;

    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
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

    // Update cart quantity display
    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
  }
});