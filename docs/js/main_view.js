"use strict";

import { getData } from './getData.js';
import { activateSlider } from './slider.js';

const main = document.querySelector('main');
const productsURL = 'https://my-json-server.typicode.com/OlegChuy/Client_Development/products';
const buttons = document.querySelectorAll('.catalog a');

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

let recommendations = null;

const mainView = (reason = 'default') => {
  if (recommendations === null) {
    getData(productsURL).then(products => {
  
      let productHTML = `
        <div class="container-fluid">
          <div class="row pizzaWrapperRow justify-content-around">
            <h3 class='recommended col-12 text-center'>Наші Рекомендації</h3>
      `;

      products.forEach(product => {
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
                  <div class="productPrice">${product['price']} грн</div>
              </div>
              <div class="addInBasket">В кошик</div>
            </div>
          `
          productHTML += productBlock;  
        }
      })

      productHTML += `
            </div>
          </div>
        `;

      recommendations = productHTML;

      if (reason != 'loadOnly') {
        main.innerHTML = view + recommendations;
        activateSlider();
        buttons.forEach((button) => {
          button.classList = [];
        })
      }

    })
  } else {
    main.innerHTML = view + recommendations;
    activateSlider();
    buttons.forEach((button) => {
      button.classList = [];
    })
  }
}

if (document.location.hash != '') {
  mainView('loadOnly');
}

export { mainView };