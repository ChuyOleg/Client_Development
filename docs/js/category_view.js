"use strict";

import { getData } from './getData.js';

const productsURL = 'https://my-json-server.typicode.com/OlegChuy/Client_Development/products';
const main = document.querySelector('main');

const buttons = document.querySelectorAll('.catalog a');

const categoryView = (categoryId) => {
  getData(productsURL).then(products => {
      
    let productHTML = `
	  <div class="container-fluid">
	    <div class="row pizzaWrapperRow justify-content-around">
	`;
 
    products.forEach(product => {
      if (product['categoryId'] === categoryId) {
        const imageURL = product['images'];
        let productName = product['productName']
        
        if (product['spicy'] === true) {
          productName += ` <span class="spicy">(гостра)</span>`;
        }

       const weight = (categoryId === 2) ? `${product['weight']} л` : `${product['weight']} г`;

        const producctBlock = `
          <div class="col-lg-3 ml-1 col-sm-5 productWrapperCol pizzaWrapperCol">
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

        productHTML += producctBlock;      

      }
    })

    productHTML += `
        </div>
      </div>
    `;
  
    buttons.forEach(button => {
      if (button.classList.length != 0) {
        button.classList = [];
      }
    })
    buttons[categoryId].classList.add('activePage');

    main.innerHTML = productHTML;
  
  })
}

export { categoryView };