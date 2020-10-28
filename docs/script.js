/*!!!!!!!!!1111!!!!!
!!!!!! HEADER !!!!!!
!!!!!!!!!!!!!!!!!!*/

const menuIcon = document.querySelector('.menu');
const extraMenu  = document.querySelector('.extraMenu');
const nav = document.querySelector('.drop-down-list');
const li_list = nav.querySelectorAll('li');
const searchBar_input = document.querySelector('.searchBar input');

searchBar_input.addEventListener

li_list.forEach(li => {
  const a = li.querySelector('a');
  
  li.addEventListener(('mouseover'), () => {
  	if (a.classList.contains('first-nesting-a')) {
      a.style.color = '#bb0f0f';
    } else {
      a.style.background = '#bb0f0f';
      a.style.color = 'white';
      a.style.border = '1px solid #bb0f0f';
    }
  });
  
  li.addEventListener(('mouseleave'), () => {
    a.style.background = '';
    a.style.color = '';
    a.style.border = '';
  });
})

menuIcon.addEventListener(('mouseenter'), () => {
  extraMenu.style.display = 'block';
})

menuIcon.addEventListener(('mouseleave'), () => {
  extraMenu.style.display = '';
})

extraMenu.addEventListener(('mouseenter'), () => {
  if (window.innerWidth < '1280') {
    extraMenu.style.display = 'block';
    menuIcon.querySelector('a').style.color = '#bb0f0f';
  }
})

extraMenu.addEventListener(('mouseleave'), () => {
  if (window.innerWidth < '1280') {
    menuIcon.querySelector('a').style.color = ''; 
    extraMenu.style.display = '';
  }
})

const firstNestingLI = extraMenu.querySelectorAll('.first-nesting-a');

if (window.innerWidth < '1280') {
  firstNestingLI.forEach(elem => elem.classList.remove('first-nesting-a'));
}

window.addEventListener('resize', () => {
  if (window.innerWidth > '1280') {
    extraMenu.style.display = '';
    firstNestingLI.forEach(elem => elem.classList.add('first-nesting-a'));  
  } else {
    firstNestingLI.forEach(elem => elem.classList.remove('first-nesting-a'));
  }
})

/*!!!!!!!!!!!!!!!!
!!!!! MAIN !!!!!!!
!!!!!!!!!!!!!!!!*/

const cars = [];
const circles = [];
let activeCar = 0;

const previousButton = document.querySelector('div.previous');
const nextButton = document.querySelector('div.next');


circles.push(document.querySelector('div.first'));
circles.push(document.querySelector('div.second'));
circles.push(document.querySelector('div.third'));

cars.push(document.querySelector('div.fourS'));
cars.push(document.querySelector('div.Turbo'));
cars.push(document.querySelector('div.TurboS'));

previousButton.addEventListener(('click'), () => {
  cars[activeCar].style.display = 'none';
  circles[activeCar].style.background = 'white';
  activeCar = (activeCar > 0) ? --activeCar : 2;
  cars[activeCar].style.display = 'grid';
  circles[activeCar].style.background = 'red';
});

nextButton.addEventListener(('click'), () => {
  cars[activeCar].style.display = 'none';
  circles[activeCar].style.background = 'white';
  activeCar = (activeCar < 2) ? ++activeCar : 0;
  cars[activeCar].style.display = 'grid';
  circles[activeCar].style.background = 'red';
});

circles.forEach((circle, index) => {
  circle.addEventListener(('click'), () => {
  	if (activeCar === index) return;
    cars[activeCar].style.display = 'none';
    circles[activeCar].style.background = 'white';
    cars[index].style.display = 'grid';
    circle.style.background = 'red';
    activeCar = index;
  })
})

sections = [];
sections.push(document.querySelector('#Highlights'));
sections.push(document.querySelector('#Design'));
sections.push(document.querySelector('#Performance'));

sections.forEach(section => {
  const button = section.querySelector('a');
  section.addEventListener('mouseenter', () => {
    button.style['animation-play-state'] = 'running';
  })
});

sections.forEach(section => {
  const button = section.querySelector('a');
  section.addEventListener('mouseleave', () => {
    button.style['animation-play-state'] = 'paused';
  })
});
