"use strict";

import { getData } from './getData.js';

const productsURL = 'https://my-json-server.typicode.com/OlegChuy/Client_Development/products';
const main = document.querySelector('main');
const pizzaButton = document.querySelector('.pizzaCatalog a');

const pizzaView = () => {
  getData(productsURL).then(products => {
      
    let pizzaHTML = `
	  <div class="container-fluid">
	    <div class="row pizzaWrapperRow justify-content-around">
	`;
    
    products.forEach(product => {
      if (product['categoryId'] === 1) {
        const imageURL = product['images'];
        console.log(imageURL);
        const spicy = (product['spice'] === 'true') ? 'гостра' : 'не гостра';

        const pizzaBlock = `
          <div class="col-lg-3 col-sm-5 productWrapperCol pizzaWrapperCol">
            <img class="pizzaImage productImage" src="${imageURL}">
            <h4 class="pizzaTitle">${product['productName']}
            <div class="pizzaSpicy">${spicy}</div>
            <div class="productWeight">${product['weight']} г</div>
            <div class="productPrice">${product['price']} грн</div>
            <div class="addInBasket">В кошик</div>
          </div>
        `

        pizzaHTML += pizzaBlock;      

      }
    })

    pizzaHTML += `
        </div>
      </div>
    `;

    pizzaButton.classList.add('activePage');
    main.innerHTML = pizzaHTML;
  
  })
}

export { pizzaView };