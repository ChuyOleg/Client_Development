"use strict";

import { mainView } from './main_view.js'
import { actionsView } from './actions_view.js';
import { categoryView } from './category_view.js';
import { basketView } from './basket_view.js';
import { getData } from './getData.js';
import { productView } from './product_view.js';
import { actionView } from './action_view.js';
import { mainCatalogView } from './mainCatalog_view.js';

const productsURL = 'https://my-json-server.typicode.com/OlegChuy/Client_Development/products';
const actionsURL = 'https://my-json-server.typicode.com/OlegChuy/Client_Development/actions';
const categoriesURL = 'https://my-json-server.typicode.com/OlegChuy/Client_Development/productsCategories';
const main = document.querySelector('main');

main.innerHTML = `<div class="loader"></div>`

const buttons = document.querySelectorAll('.catalog a');
const clearButtonsColor = () => {
	buttons.forEach((button) => {
	  button.classList = [];
	});
}

const findUrlForCase = (array) => {
  let urlForCase = array[0]['url'];
  let elemIndex = 0;
  array.forEach((elem, index) => {
    if (document.location.hash == ('#' + elem['url'])) {
      urlForCase = document.location.hash;
      elemIndex = index;
      return;
    }
  })
  return { urlForCase, elemIndex };
}

const getActivePage = (data) => {
  const products = data[0];
  const actions = data[1];
  const categories = data[2];

  const { urlForCase: productUrl, elemIndex: productId } = findUrlForCase(products);
  const { urlForCase: actionUrl, elemIndex: actionId } = findUrlForCase(actions);

  const activeHash = document.location.hash;
	switch(activeHash) {
	  case '#action':
	    actionsView(actions);
	    break;

    case '#mainCatalog':
      mainCatalogView(products);
      break;

    case '#pizza':
      categoryView(products, 1);
      break;

    case '#drink':
      categoryView(products, 2);
      break;

    case '#dessert':
      categoryView(products, 3);
      break;

    case '#basket':
      basketView(products);
      clearButtonsColor();
      break;

    case (productUrl):
      productView(products[productId], productId);
      clearButtonsColor();
      break;

    case (actionUrl):
      actionView(actions[actionId], actionId);
      clearButtonsColor();
      break;
  
	  default:
      mainView(products, actions);
      clearButtonsColor();
	    break;
	}
}

(async () => {
  const products = await getData(productsURL);
  const actions = await getData(actionsURL);
  const categories = await getData(categoriesURL);
  const data = [products, actions, categories];
  actionsView(actions);
  mainCatalogView(products);
  categoryView(products, 1); // no matter 1, 2 or 3
  mainView(products, actions);
  products.forEach((product, index) => {
    productView(product, index);
  });
  actions.forEach((action, index) => {
    actionView(action, index);
  })
  
  getActivePage(data);
 
  // globalThis.onload = getActivePage;
  globalThis.addEventListener('hashchange', getActivePage.bind(null, data));
})();
