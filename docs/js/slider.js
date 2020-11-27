"use strict";

const slide_wrapper = document.querySelector('.slider .slide-wrapper');
const circles = document.querySelectorAll('.slider .circle');
let activeCircleIndex = 0;

const changeAction = (activeCircle, newCircle) => {
  const widthDifference = 100 * (0 - newCircle);
  slide_wrapper.style.transform = `translate(${widthDifference}%, 0)`;
  activeCircleIndex = newCircle;
}

circles.forEach((circle, index) => {
  circle.addEventListener('click', () => {
  	if (activeCircleIndex != index) {
      circles[activeCircleIndex].classList.remove('activeCircle');
      changeAction(activeCircleIndex, index);
      circle.classList.add('activeCircle');
    }
  })
});

