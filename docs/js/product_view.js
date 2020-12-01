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

  const imageURL = product['images'];
  let productName = product['productName'];
  if (product['spicy'] === true) {
    productName += ` <span class="spicy">(гостра)</span>`;
  }
  const weight = (product['categoryId'] === 2) ? `${product['weight']} л` : `${product['weight']} г`;
  const productHTML = `
    <div class="productDiv">
      <img class="singleProductImage" src="${imageURL}">
      <h4 class="productTitle">${productName}</h4>
      <p class="productDescription">${product['productDescription']}</p>
      <div class="priceAndWeight">
        <div class="singleProductWeight">${weight}</div>
        <div class="singleProductPrice productPrice"><span>${product['price']}</span> грн</div>
      </div>
      <div id="add${productId}" class="addInBasket">В кошик</div>
      <div id="rem${productId}" class="removeFromBasket">Відмінити</div>
    </div>
  `;

  viewsHTML.push(productHTML);
}

export { productView };