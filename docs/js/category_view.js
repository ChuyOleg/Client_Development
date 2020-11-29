"use strict";

import { getData } from './getData.js';

const productsURL = 'https://my-json-server.typicode.com/OlegChuy/Client_Development/products';
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

const categoryView = viewNum => {

  if (viewsHTML === null) {
    
    const views = [];
    getData(productsURL).then(products => {
      console.log('GET INFO');
      for (let categoryId = 1; categoryId <= 3; categoryId++) { 

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

        views.push(productHTML);
      }

      viewsHTML = views;
      main.innerHTML = viewsHTML[viewNum - 1];
      changeButtonColor(viewNum);
    })
  } else {
    main.innerHTML = viewsHTML[viewNum - 1];
    changeButtonColor(viewNum);
  }
};

export { categoryView };