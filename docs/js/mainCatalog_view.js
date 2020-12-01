"use strict";

import { addInBasketListener, updateButtons } from './addInBasket.js';

const main = document.querySelector('main');

const buttons = document.querySelectorAll('.catalog a');

let viewsHTML = null;

const changeButtonColor = () => {
  buttons.forEach(button => {
    if (button.classList.length != 0) {
      button.classList = [];
    }
  })
  buttons[1].classList.add('activePage');
}

const mainCatalogView = products => {

  if (viewsHTML != null) {
    main.innerHTML = viewsHTML;
    addInBasketListener();
    updateButtons();
    changeButtonColor();
    return;
  }
  
  let mainView = ``;

  for (let categoryId = 1; categoryId <= 3; categoryId++) {
    
    let categoryName = 'Піца';
    if (categoryId === 2) categoryName = 'Напої';
    if (categoryId === 3) categoryName = 'Десерти';

    let productHTML = `
      <div class="container-fluid">
        <div class="row pizzaWrapperRow justify-content-around">
          <h4 class="catalogName col-12 text-center">${categoryName}</h4>
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
              <div class="extraInfo"><a href="#${product['url']}">деталі</a></div>
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

    if (categoryId != 3) productHTML += `<hr>`

    mainView += productHTML;
  }

  viewsHTML = mainView;
}

export { mainCatalogView };