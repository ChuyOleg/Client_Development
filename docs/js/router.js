"use strict";

import { actionsView } from './actions_view.js';
import { mainView } from './main_view.js'
import { activateSlider } from './slider.js';

const getActivePage = () => {
  const activeHash = document.location.hash;
	switch(activeHash) {
	  case '#action':
	    actionsView();
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