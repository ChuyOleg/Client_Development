"use strict";

import { mainView } from './main_view.js'
import { actionsView } from './actions_view.js';
import { categoryView } from './category_view.js';
import { getData } from './getData.js';
import { createProducts } from './createProducts.js'

const productsURL = 'https://my-json-server.typicode.com/OlegChuy/Client_Development/products';
const actionsURL = 'https://my-json-server.typicode.com/OlegChuy/Client_Development/actions';
const categoriesURL = 'https://my-json-server.typicode.com/OlegChuy/Client_Development/productsCategories';

const getActivePage = (data) => {
  const products = data[0];
  const actions = data[1];
  const categories = data[2];
  const activeHash = document.location.hash;
	switch(activeHash) {
	  case '#action':
	    actionsView(actions);
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

	  default:
      mainView();
	    break;
	}
}

(async () => {
  const products = await getData(productsURL);
  const actions = await getData(actionsURL);
  const categories = await getData(categoriesURL);
  const data = [products, actions, categories];
  actionsView(actions);
  categoryView(products, 1); // no matter 1, 2 or 3
  mainView(products);
  // const productsHTML = createProducts(products);
  getActivePage(data);
 
  // globalThis.onload = getActivePage;
  globalThis.addEventListener('hashchange', getActivePage.bind(null, data));
})();
