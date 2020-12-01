"use strict";

const main = document.querySelector('main');

let viewsHTML = [];

const actionView = (action, actionId) => {

	if (viewsHTML[actionId] != undefined) {
    main.innerHTML = viewsHTML[actionId];
    return;
	}

  const imageURL = action['images'];
  const actionBlock = `
	  <div class="actionDiv">
	    <h3 class="actionTitle">${action['name']}</h3>
		  <img class="singleActionImage" src="${imageURL}">
	    <div class="actionDescription">${action['description']}</div>
	    <div class="dataPosted">${action['dataPosted']}</div>
	  </div>
  `;
  
  viewsHTML.push(actionBlock);
}

export { actionView };