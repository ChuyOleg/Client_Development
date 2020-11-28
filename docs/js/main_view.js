"use strict";

const main = document.querySelector('main');

const view = `
  <div class="slider">
	  <div class="slide-wrapper">
			<div class="action-1"></div>
			<div class="action-2"></div>
			<div class="action-3"></div>
			<div class="action-4"></div>
			<div class="action-5"></div>
		</div>
  	<div class="switch">
  		<div class="circle"></div>
  		<div class="circle"></div>
  		<div class="circle"></div>
  		<div class="circle"></div>
  		<div class="circle"></div>
  	</div>
  </div>
`

const mainView = () => {
  main.innerHTML = view;
};

export { mainView };