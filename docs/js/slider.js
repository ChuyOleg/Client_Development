"use strict";

let activeCircleIndex = 0;

const changeAction = (newCircle, circles, slideWrapper) => {
  if (activeCircleIndex != newCircle) {
    circles[activeCircleIndex].classList.remove('activeCircle');
    const widthDifference = 100 * (0 - newCircle);
    slideWrapper.style.transform = `translate(${widthDifference}%, 0)`;
    activeCircleIndex = newCircle;
    circles[newCircle].classList.add('activeCircle');
  }
}

const setStartAction = (slideWrapper, circles) => {
  const widthDifference = 100 * (0 - activeCircleIndex);
  slideWrapper.style.transform = `translate(${widthDifference}%, 0)`;
  circles[activeCircleIndex].classList.add('activeCircle');
};

const activateSlider = () => {
 
  const slide_wrapper = document.querySelector('.slider .slide-wrapper');
  const circles = document.querySelectorAll('.slider .circle');
 
  setStartAction(slide_wrapper, circles);

  circles.forEach((circle, index) => {
    const args = [index, circles, slide_wrapper];
    circle.addEventListener('click', changeAction.bind(null, ...args));
  })
};

export { activateSlider };
