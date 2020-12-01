"use strict";

import { addInBasketListener, updateButtons } from './addInBasket.js';

const main = document.querySelector('main');

let viewsHTML = [];

const productView = (product, productId) => {
  if (viewsHTML[productId] != undefined) {
    main.innerHTML = viewsHTML[productId];
    addInBasketListener();
    updateButtons();
    return;
  }

  let productHTML = `
      <div class="container-fluid">
        <div class="row pizzaWrapperRow justify-content-center">
    `;

  const imageURL = product['images'];
  let productName = product['productName'];
  if (product['spicy'] === true) {
    productName += ` <span class="spicy">(гостра)</span>`;
  }
  const weight = (product['categoryId'] === 2) ? `${product['weight']} л` : `${product['weight']} г`;
  productHTML = `
    <div class="col-lg-8 col-sm-12 productWrapperCol pizzaWrapperCol">
      <img class="pizzaImage productImage" src="${imageURL}">
      <h4 class="productTitle">${productName}</h4>
      <div class="priceAndWeight">
        <div class="productWeight">${weight}</div>
        <div class="extraInfo"><a href="#${product['url']}">деталі</a></div>
        <div class="productPrice"><span>${product['price']}</span> грн</div>
      </div>
      <div id="add${productId}" class="addInBasket">В кошик</div>
      <div id="rem${productId}" class="removeFromBasket">Відмінити</div>
    </div>
  `;

  productHTML += `
      </div>
    </div>
  `;

  viewsHTML.push(productHTML);
}

export { productView };