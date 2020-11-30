"use strict";

import { activateSlider } from './slider.js';
import { addInBasketListener, updateButtons } from './addInBasket.js';

let main = document.querySelector('main');
const buttons = document.querySelectorAll('.catalog a');

let mainViewHTML = null;

let view = `
  <div class="slider">
	  <div class="slide-wrapper">
			<div class="action-1"></div>
			<div class="action-2"></div>
			<div class="action-3"></div>
			<div class="action-4"></div>
			<div class="action-5"></div>
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

const mainView = (products) => {

  if (mainViewHTML != null) {
    main.innerHTML = mainViewHTML;
    activateSlider();
    addInBasketListener(); 
    updateButtons();
    buttons.forEach((button) => {
      button.classList = [];
    })
    return;
  }

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