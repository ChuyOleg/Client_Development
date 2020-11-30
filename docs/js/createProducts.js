"use strict";

let productsHTML = null;

const createProducts = (products) => {
	if (productsHTML != null) return productsHTML;
  const result = [];
  products.forEach(product => {
    const div = document.createElement('div');
    let productName = product['productName'];

    if (product['spicy'] === true) {
      productName += ` <span class="spicy">(гостра)</span>`;
    }

   const weight = (product['categoryId'] === 2) ? `${product['weight']} л` : `${product['weight']} г`;

    div.classList = 'col-lg-3 ml-1 col-sm-5 productWrapperCol';
    const htmlBlock = `
	    <img class="productImage" src="${product['images']}">
	    <h4 class="productTitle">${productName}</h4>
      <div class="priceAndWeight">
        <div class="productWeight">${weight}</div>
        <div class="extraInfo"><a href="#${product['productName']}">деталі</a></div>
        <div class="productPrice">${product['price']} грн</div>
      </div>
      <div class="addInBasket">В кошик</div>
      <div class="removeFromBasket">Відмінити</div>
    `;
    result.push(div);
  })
  productsHTML = result;
  return result;
};

export { createProducts };

