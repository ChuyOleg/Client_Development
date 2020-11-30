"use strict";

const quantity = document.getElementById('quantity');
const price = document.getElementById('priceNumber');
localStorage.setItem('cart', JSON.stringify({}));

const updateButtons = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  for (const key in cart) {
  	const addButton = document.getElementById(`add${key}`);
    const remButton = document.getElementById(`rem${key}`);
  	if (addButton) {
      addButton.style.display = 'none';
      remButton.style.display = 'block';
  	}
  }
}

const addInBasketListener = () => {
  const addInBasketButtons = document.querySelectorAll('.addInBasket');
  const removeFromBasketButtons = document.querySelectorAll('.removeFromBasket');
  
  addInBasketButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
    	const productId = button.id.slice(3);
    	const cart = JSON.parse(localStorage.getItem('cart'));
    	cart[productId] = 1;
    	localStorage.setItem('cart', JSON.stringify(cart));
      button.style.display = 'none';
      removeFromBasketButtons[index].style.display = 'block';
      quantity.innerText++;
      const productPrice = button.parentNode.querySelector('.productPrice span').innerText;
      price.innerText = Number.parseInt(price.innerText) + Number.parseInt(productPrice);
    })
  });

  removeFromBasketButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
    	const productId = button.id.slice(3);
    	const cart = JSON.parse(localStorage.getItem('cart'));
    	delete cart[productId];
      localStorage.setItem('cart', JSON.stringify(cart));
      button.style.display = 'none';
      addInBasketButtons[index].style.display = 'block';
      quantity.innerText--;
      const productPrice = button.parentNode.querySelector('.productPrice span').innerText;
      price.innerText = Number.parseInt(price.innerText) - Number.parseInt(productPrice);
    })
  });
}

export { addInBasketListener, updateButtons };



