"use strict";

import { activateSlider } from './slider.js';
import { addInBasketListener, updateButtons } from './addInBasket.js';

let main = document.querySelector('main');

let mainViewHTML = null;


const mainView = (products, actions) => {

  if (mainViewHTML != null) {
    main.innerHTML = mainViewHTML;
    activateSlider();
    addInBasketListener(); 
    updateButtons();
    return;
  }

  let view = `
  <div class="slider">
    <div class="slide-wrapper">
      <div class="action-1"><a href="#${actions[0]['url']}">Деталі</a></div>
      <div class="action-2"><a href="#${actions[1]['url']}">Деталі</a></div>
      <div class="action-3"><a href="#${actions[2]['url']}">Деталі</a></div>
      <div class="action-4"><a href="#${actions[3]['url']}">Деталі</a></div>
      <div class="action-5"><a href="#${actions[4]['url']}">Деталі</a></div>
    </div>
    <div class="switch">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
  </div>
`

  let productHTML = `
    <div class="container-fluid">
      <div class="row pizzaWrapperRow justify-content-around">
        <h3 class='recommended col-12 text-center'>Наші Рекомендації</h3>
  `;
  
  products.forEach((product, index) => {

    if (product['recommended'] === true) {
      const imageURL = product['images'];
      const productName = product['productName'];
      const weight = (product['categoryId'] === 2) ? `${product['weight']} л` : `${product['weight']} г`;
      const productBlock = `
        <div class=" ml-2 col-sm-4 productWrapperCol pizzaWrapperCol">
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
      `
      productHTML += productBlock;
    }
  })

  productHTML += `
      </div>
    </div>
  `;

  mainViewHTML = view + productHTML;

}

export { mainView };