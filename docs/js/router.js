"use strict";

import { mainView } from './main_view.js'
import { actionsView } from './actions_view.js';
import { pizzaView } from './pizza_view.js';
import { activateSlider } from './slider.js';

const getActivePage = () => {
  const activeHash = document.location.hash;
	switch(activeHash) {
	  case '#action':
	    actionsView();
	    break;

    case '#pizza':
      pizzaView();
      break;

	  default:
	    document.location.hash = '';
      mainView();
	    activateSlider();
	    break;
	}
}

globalThis.addEventListener('hashchange', getActivePage);

globalThis.onload = getActivePage;