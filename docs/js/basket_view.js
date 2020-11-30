"use strict";

const main = document.querySelector('main');

const basketView = products => {
  
  let basketHTML = `
    <div class="container-fluid">
      <div class="row actionWrapperRow justify-content-around">
        <h3 class="orderTitle col-12 text-center">Ваше замовлення</h3>
  `
  const cart = JSON.parse(localStorage.getItem('cart'));
  
  products.forEach((product, index) => {
    for (const key in cart) {
      if (index == key) {
        const imageURL = product['images'];
        let productName = product['productName'];

        if (product['spicy'] === true) {
          productName += ` <span class="spicy">(гостра)</span>`;
        }

        const weight = (product['productId'] === 2) ? `${product['weight']} л` : `${product['weight']} г`;
      
        const productBlock = `
          <div class="col-lg-5 ml-1 col-sm-10 orderWrapperCol productWrapperCol pizzaWrapperCol">
            <img class="pizzaImage productImage" src="${imageURL}">
            <div class="orderPriceAndWeight">
              <h4 class="productTitle">${productName}</h4>
              <div class="productWeight">${weight}</div>
              <div class="productPrice"><span>${product['price']}</span> грн</div>
              <div class="extraInfo"><a href="#${product['productName']}">деталі</a></div>
            </div>
            <div class="plusOne">+1</div>
            <div class="minusOne">-1</div>
          </div>
        `;
            // <div id="add${index}" class="addInBasket">В кошик</div>
            // <div id="rem${index}" class="removeFromBasket">Відмінити</div>

        basketHTML += productBlock;
      }
    }
  })

  basketHTML += `<div class="orderButton col-12"><a href="#order">Замовити</a></div>`;
 
  main.innerHTML = basketHTML;
}

export { basketView };