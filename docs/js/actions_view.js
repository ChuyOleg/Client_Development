"use strict";

import { getData } from './getData.js';

const actionsURL = 'https://my-json-server.typicode.com/OlegChuy/Client_Development/actions';
const categoriesURL = 'https://my-json-server.typicode.com/OlegChuy/Client_Development/productsCategories';

getData(actionsURL).then(data => console.log(data));
//const data = getData(actionsURL);
getData(categoriesURL).then(data => console.log(data));

