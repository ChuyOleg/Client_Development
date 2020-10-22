const menuIcon = document.querySelector('.menu');
//const models_menu = document.querySelector('.models-menu');
const extraMenu  = document.querySelector('.extraMenu');
const nav = document.querySelector('.drop-down-list');
const li_list = nav.querySelectorAll('li');

li_list.forEach(elem => {
  elem.addEventListener(('mouseenterr'), () => {
  	const a = elem.querySelector('a');
  	if (a.classList.contains('first-nesting-a')) {
      /*a..background = '';
      a.style.color = '#bb0f0f';
      a.style.border = '';*/
    } else {
      /*a.style.background = '#bb0f0f';
      a.style.color = 'white';
      a.style.border = '1px solid #bb0f0f';*/
    }
  })
})

li_list.forEach(elem => {
  const a = elem.querySelector('a');
  elem.addEventListener(('mouseleave'), () => {
    /*a.style.background = 'blue';*/
    /*a.style.color = '';
    a.style.border = '';*/
  })
})

menuIcon.addEventListener(('mouseenter'), () => {
  extraMenu.style.display = 'block';
})

menuIcon.addEventListener(('mouseleave'), () => {
  extraMenu.style.display = '';
})

extraMenu.addEventListener(('mouseenter'), () => {
  if (document.documentElement.clientWidth < '1280') {
    extraMenu.style.display = 'block';
    menuIcon.querySelector('a').style.color = '#bb0f0f';
  }
})

extraMenu.addEventListener(('mouseleave'), () => {
  if (document.documentElement.clientWidth < '1280') {
    menuIcon.querySelector('a').style.color = ''; 
    extraMenu.style.display = '';
  }
})

const firstNestingLI = extraMenu.querySelectorAll('.first-nesting-a');

if (document.documentElement.clientWidth < '1280') {
  firstNestingLI.forEach(elem => elem.classList.remove('first-nesting-a'));
}

window.addEventListener('resize', () => {
  if (document.documentElement.clientWidth > '1280') {
    extraMenu.style.display = '';
    firstNestingLI.forEach(elem => elem.classList.add('first-nesting-a'));  
  } else {
    firstNestingLI.forEach(elem => elem.classList.remove('first-nesting-a'));
  }
})