"use strict";

const main = document.querySelector('main');

const cartIsEmpty = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  for (const key in cart) {
    return false;
  }
  return true;
}

const orderForm = `
  <form id="orderForm" action="" method="post" class="row orderFormRow justify-content-around">
    <input type="text" name="name" required class="col-8 col-md-3" placeholder="Ім'я">
    <input type="text" name="lastName" required class="col-8 col-md-3" placeholder="Фамілія">
    <input type="text" list="phone" name="phone"pattern="380[0-9]{9}" required class="col-8 col-md-3" placeholder="Телефон">
    <datalist id="phone">
      <option>380937777777</option>
    </datalist>
    <input type="email" name="email" required class="col-8 col-md-5" placeholder="Email">
    <input type="text" name="address" required class="col-8 col-md-5" placeholder="Адрес">
    <input type="text" name="date" required class="col-8 col-md-5" placeholder="Дата доставки">
    <input type="text" name="time" required class="col-8 col-md-5" placeholder="Час доставки">
    <input type="text" name="paymentMethod" required class="col-8 col-md-5" placeholder="оплата">
    <input type="text" name="paymentMethod" required class="col-8 col-md-5" placeholder="оплата">
  </form>
`;


const basketView = products => {
  
  if (cartIsEmpty()) {
    document.location.hash = '#';
    return;
  }

  const totalPrice = document.querySelector('#price span');

  let basketHTML = `
    <div class="container-fluid">
      <div class="row actionWrapperRow justify-content-around">
        <h3 class="orderTitle col-12 text-center">Ваше замовлення</h3>
  `
  const cart = JSON.parse(localStorage.getItem('cart'));
  
  products.forEach((product, index) => {

    for (const key in cart) {
      if (index == key) {
        const imageURL = product['images'];
        let productName = product['productName'];

        if (product['spicy'] === true) {
          productName += ` <span class="spicy">(гостра)</span>`;
        }

        const weight = (product['productId'] === 2) ? `${product['weight']} л` : `${product['weight']} г`;
      
        const cart = JSON.parse(localStorage.getItem('cart'));
        const productQuantity = cart[index];

        const productBlock = `
          <div class="col-lg-5 ml-1 col-sm-10 orderWrapperCol productWrapperCol pizzaWrapperCol">
            <img class="pizzaImage productImage" src="${imageURL}">
            <div class="orderPriceAndWeight">
              <h4 class="productTitle">${productName}</h4>
              <div class="orderWeightPrice">
                <div class="productWeight">${weight}</div>
                <div class="productPrice"><span>${product['price']}</span> грн</div>
              </div>
              <div class="orderExtraInfo"><a href="#${product['url']}">деталі</a></div>
              <div class="orderCounter"><span>${productQuantity}</span></div>
            </div>
            <div id="one${index}" class="plusOne">+1</div>
            <div id="one${index}" class="minusOne">-1</div>
          </div>
        `;

        basketHTML += productBlock;
      }
    }
  })

  basketHTML += `<div class="totalPrice col-12 text-center">Повна ціна: <span>${totalPrice.innerText}</span> грн</div></div>`;
  basketHTML += orderForm;
  basketHTML += `<div class="orderButton col-12"><button name="button" form="orderForm">Замовити</button></div></div>`;
  main.innerHTML = basketHTML;

  const plusButtons = document.querySelectorAll('.plusOne');
  const minusButtons = document.querySelectorAll('.minusOne');
  const counters = document.querySelectorAll('.orderCounter span');

  const showTotalPrice = document.querySelector('.totalPrice span');
  const quantity = document.getElementById('quantity');

  plusButtons.forEach((button, index) => {
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
  });

  minusButtons.forEach((button, index) => {
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
  })
}

const addButton = document.querySelector('.plusOne');

export { basketView };