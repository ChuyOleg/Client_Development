"use strict";

import { getData } from './getData.js';

const actionsURL = 'https://my-json-server.typicode.com/OlegChuy/Client_Development/actions';
const main = document.querySelector('main');

const actionsView = () => {
	getData(actionsURL).then(actions => {

	  let actionsHTML = `
	    <div class="container-fluid">
	      <div class="row actionWrapperRow justify-content-around">
	  `;

	  actions.forEach(action => {

	    const imageURL = '..' + action['images'];
		  const actionBlock = `
			      <div class="col-lg-5 actionWrapperCol">
			        <h3 class="actionTitle">${action['name']}</h3>
			        <img class="actionImage" src="${imageURL}">
			        <div class="actionDescription">${action['description']}</div>
			        <div class="dataPosted">${action['dataPosted']}</div>
			      </div>
		  `

		  actionsHTML += actionBlock;
	  })
	    
	    actionsHTML += `
	        </div>
	      </div>
	    `;

	  main.innerHTML = actionsHTML;
	})
};

export { actionsView };