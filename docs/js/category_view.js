"use strict";

import { addInBasketListener, updateButtons } from './addInBasket.js';

const main = document.querySelector('main');

const buttons = document.querySelectorAll('.catalog a');

let viewsHTML = null;

const changeButtonColor = (viewNum) => {
  buttons.forEach(button => {
    if (button.classList.length != 0) {
      button.classList = [];
    }
  })
  buttons[viewNum].classList.add('activePage');
}

const categoryView = (products, viewNum) => {

  if (viewsHTML != null) {
    main.innerHTML = viewsHTML[viewNum - 1];
    addInBasketListener();
    updateButtons();
    changeButtonColor(viewNum);
    return;
  }

  const views = []; 
  for (let categoryId = 1; categoryId <= 3; categoryId++) {
    let productHTML = `
      <div class="container-fluid">
        <div class="row pizzaWrapperRow justify-content-around">
    `;
    products.forEach((product, index) => {
      if (product['categoryId'] === categoryId) {
        const imageURL = product['images'];
        let productName = product['productName'];

        if (product['spicy'] === true) {
          productName += ` <span class="spicy">(гостра)</span>`;
        }
      
        const weight = (categoryId === 2) ? `${product['weight']} л` : `${product['weight']} г`;
        
        const productBlock = `
          <div class="col-lg-3 ml-1 col-sm-5 productWrapperCol pizzaWrapperCol">
            <img class="pizzaImage productImage" src="${imageURL}">
            <h4 class="productTitle">${productName}</h4>
            <div class="priceAndWeight">
              <div class="productWeight">${weight}</div>
              <div class="extraInfo"><a href="#${product['productName']}">деталі</a></div>
              <div class="productPrice"><span>${product['price']}</span> грн</div>
            </div>
            <div id="add${index}" class="addInBasket">В кошик</div>
            <div id="rem${index}" class="removeFromBasket">Відмінити</div>
          </div>
        `;

        productHTML += productBlock;
      }
    })

    productHTML += `
        </div>
      </div>
    `;

    views.push(productHTML);
  }

  viewsHTML = views;
}

export { categoryView };