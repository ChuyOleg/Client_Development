"use strict";

const main = document.querySelector('main');
const quantity = document.querySelector('#quantity');
const price = document.querySelector('#price #priceNumber');

const statusView = (products, cart) => {
  let productHTML = `
    <div class="container-fluid">
      <div class="row pizzaWrapperRow justify-content-around">
      <h4 class="col-12 text-center">Ваше замовлення</h4>
  `;
  for (const key in cart) {
    const product = products[key];
    const index = cart[key];
      const imageURL = product['images'];
      let productName = product['productName'];

      if (product['spicy'] === true) {
        productName += ` <span class="spicy">(гостра)</span>`;
      }
    
      const weight = (product['categoryId'] === 2) ? `${product['weight']} л` : `${product['weight']} г`;
      
      const productBlock = `
        <div class="col-lg-3 ml-1 col-sm-5 productWrapperCol pizzaWrapperCol">
          <img class="pizzaImage productImage" src="${imageURL}">
          <h4 class="productTitle">${productName}</h4>
          <div class="priceAndWeight">
            <div class="productWeight">${weight}</div>
            <div class="statusQuantity"><div>${cart[key]}</div></div>
            <div class="productPrice"><span>${product['price']}</span> грн</div>
          </div>
        </div>
      `;

      productHTML += productBlock;
  }
  productHTML += `
      <h4 class="col-12 text-center moreInfo">Більше інформації знайдете на Вашій електронній пошті</h4>
      <h4 class="col-12 text-center">Дякуємо, що обрали саме нас!</h4>
      </div>
    </div>
  `

  main.innerHTML = productHTML;
  quantity.innerText = 0;
  price.innerText = 0;
};

export { statusView };