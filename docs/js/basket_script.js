"use strict";

const ordersURL = 'https://my-json-server.typicode.com/OlegChuy/Client_Development/orders';

const plusFunc = (button, index, minusButtons, counters, showTotalPrice, quantity, totalPrice) => {
  button.addEventListener('click', () => {
    const productPrice = button.parentNode.querySelector('.productPrice span');
    counters[index].innerText++;
    const newTotalPrice = Number.parseInt(totalPrice.innerText) + Number.parseInt(productPrice.innerText);
    totalPrice.innerText = newTotalPrice;      
    showTotalPrice.innerText = newTotalPrice;
    quantity.innerText++;
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart[button.id.slice(3)] = cart[button.id.slice(3)] + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
  })
};

const minusFunc = (button, index, minusButtons, counters, showTotalPrice, quantity, totalPrice) =>{
  button.addEventListener('click', () => {
    const productPrice = button.parentNode.querySelector('.productPrice span');
    counters[index].innerText--;
    const newTotalPrice = Number.parseInt(totalPrice.innerText) - Number.parseInt(productPrice.innerText);
    totalPrice.innerText = newTotalPrice;
    showTotalPrice.innerText = newTotalPrice;
    quantity.innerText--;
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart[button.id.slice(3)] == 1) {
      delete cart[button.id.slice(3)];
    } else {
      cart[button.id.slice(3)] = cart[button.id.slice(3)] - 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    if (counters[index].innerText == 0) {
    	const parentNode = document.querySelector('.actionWrapperRow');
      parentNode.removeChild(button.parentNode);
    }
  })
};

const sendOrder = async inputs => {
	let validityOK = true;
  const cart = JSON.parse(localStorage.getItem('cart'));
  let cartIsEmpty = true; 
  
  for (const key in cart) {
    cartIsEmpty = false;
    break;
  
  }
  if (cartIsEmpty) {
    alert('Корзина пуста.');
    return;
  }
  
  inputs.forEach(input => {
    if(input.checkValidity() === false) {
    	input.reportValidity();
      validityOK = false;
      return;
    }
  })
  
  if (validityOK) {
  	let formData = {};
  	inputs.forEach(input => {
      formData[input.name] = input.value;
  	});
    const response = await fetch(ordersURL, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok === false) {
      alert('Сталася помилка, спробуйте ще раз.');
      return;
    }
    const data = await response.json();
    const id = data['id'];
    document.location.href = (`#id${id}`);
  };
};

export { plusFunc, minusFunc, sendOrder };