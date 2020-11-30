"use strict";

const main = document.querySelector('main');

const buttons = document.querySelectorAll('.catalog a');

const changeButtonColor = () => {
  buttons.forEach(button => {
	  if (button.classList.length != 0 ) {
	    button.classList = [];
	  }
	})
	buttons[0].classList = 'activePage';
}

let view = null;

const actionsView = (actions) => {
	if (view != null) {
    main.innerHTML = view;
    changeButtonColor();
    return;
	}
  let actionsHTML = `
    <div class="container-fluid">
      <div class="row actionWrapperRow justify-content-around">
  `;

  actions.forEach((action) => {
    const imageURL = action['images'];
    const actionBlock = `
		  <div class="col-lg-5 actionWrapperCol">
		    <h3 class="actionTitle">${action['name']}</h3>
		    <img class="actionImage" src="${imageURL}">
		    <div class="actionDescription">${action['description']}</div>
		    <div class="dataPosted">${action['dataPosted']}</div>
		  </div>
	  `;
	  actionsHTML += actionBlock;
  })

  actionsHTML += `
	    </div>
	  </div>
	`;
  
  view = actionsHTML;
}

export { actionsView };