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