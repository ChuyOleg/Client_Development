const saveInfoButton = document.querySelector('#saveInfo');
const addNoteButton = document.querySelector('.addNote');
const removeNoteButton = document.querySelector('.remove');

const notes = [];
let activeNote = [null, null];
const divOverAllNotes = document.querySelector('.mainLeftPart'); 
let baseURL = null;
let activeNoteName = null;
if (location.href.indexOf('#') != -1) {
  baseURL = location.href.slice(0, location.href.indexOf('#'));
  activeNoteName = location.href.slice(location.href.indexOf('#') + 1);
} else {
  baseURL = location.href;
}

const TimeAndDate = () => {
  let result = null;
  const time = new Date().toLocaleTimeString().slice(0, 5);
  const date = new Date().toLocaleDateString();
  result = time + ' ' + date;
  return result;
}

const changeActiveNote = (lastActiveNote, newActiveNote) => {
  if (lastActiveNote[0]) {
  	lastActiveNote[0].classList.remove('activeNote');
  }
  let index = null;
  for (const key of notes) {
    if (key.div === newActiveNote) index = notes.indexOf(key); 
  }
  activeNote[0] = newActiveNote;
  activeNote[1] = index;
  newActiveNote.classList.add('activeNote');
  document.querySelector('textarea.title').value = notes[index]['title'] || null;
  document.querySelector('textarea.mainText').value = notes[index]['text'] || null;
  location.href =  notes[index]['title'] ? 
    baseURL + '#' + (notes[index]['title'].replace(/\s+/g, '')) :
    baseURL + '#';
}

const addNote = () => {
  for (let i = 0; i < notes.length; i++) {
	  if (notes[i]['div'].childNodes.length === 0) {
	    alert('You need to fill your previous note');
	    return;
	  }
	}
	document.querySelector('textarea.title').value = null;
	document.querySelector('textarea.mainText').value = null;
  const div = document.createElement('div');
  div.className = 'newBlock';
  notes.push({div});
  divOverAllNotes.after(div);
  location.href = baseURL + '#';
  div.addEventListener(('click'), () => changeActiveNote(activeNote, div));
  if (activeNote[0]) activeNote[0].classList.remove('activeNote');
  activeNote[0] = notes[notes.length - 1].div;
  activeNote[0].classList.add('activeNote');
  activeNote[1] = notes.length - 1;
  document.querySelector('span.quantity').innerText++;
}

const removeNote = () => {
  if (notes.length && activeNote[0]) {
    firstColumn = document.querySelector('.col-1');
    firstColumn.removeChild(activeNote[0]);
    const indexThisEl = activeNote[1];
    localStorage.removeItem(notes[indexThisEl]['title']);
    notes.splice(indexThisEl, 1);
    document.querySelector('span.quantity').innerText--;
    if (notes.length) {
    	changeActiveNote([null, null], notes[notes.length - 1]['div']);
    } else {
      activeNote = [null, null];
      location.href = baseURL + '#';
      document.querySelector('textarea.title').value = null;
      document.querySelector('textarea.mainText').value = null;
    }
  }
}

const saveInfo = (object, title, text, time) => {
  if (activeNote[0]) {

  	let h3 = null;
  	let p = null;
  	const activeNoteIndex = activeNote[1];
  	const prevTitle = notes[activeNoteIndex]['title'];
  	
  	if (!title) title = document.querySelector('textarea.title').value.trim().replace(/\r?\n|\r/g, "");
	  if (!text) text = document.querySelector('textarea.mainText').value; 
	  const timeAndDate = time || TimeAndDate();

    for (const key of notes) {
  	  if (key.title && key.title.replace(/\s+/g, '') === title.replace(/\s+/g, '') && title != prevTitle) {
  	    alert('You already have a note with this title, please replace it');
  	    return;
  	  } else if (title.length === 0) {
        alert('Write your title');
        return;
  	  }
    }

  	
  	h3 = activeNote[0].querySelector('h3') || (document.createElement('h3'));
  	h3.className = 'titleText';
	  h3.innerText = title;
  	
  	p = activeNote[0].querySelector('p') || (document.createElement('p'));
  	p.className = 'time';
	  p.innerText = text.slice(0, 15) + ' ...\n\n' + timeAndDate;
	  if (text.indexOf('\n') != -1) {
      p.innerText = text.slice(0, text.indexOf('\n')) + '...\n\n' + timeAndDate;
	  }
  	
  	notes[activeNoteIndex].time = timeAndDate;
	  notes[activeNoteIndex].title = title;
	  notes[activeNoteIndex].text = text;
	  
	  if (prevTitle) localStorage.removeItem(prevTitle)
	  location.href = baseURL + '#' + title.replace(/\s+/g, ''); 
	  const fullInfo = JSON.stringify([text, notes[activeNoteIndex]['time']]);
	  localStorage.setItem(title, fullInfo);
	  
	  if (activeNote[0].childNodes.length === 0) {
	    activeNote[0].appendChild(h3);
	    activeNote[0].appendChild(p);
    }
    
    divOverAllNotes.after(activeNote[0]);
  }
}

const refreshPage = () => {
  
  const localArray = Object.keys(localStorage)
	  .filter((el) => {
	    const data = JSON.parse(localStorage.getItem(el));
	    if (data.length != 2 || data[1].slice(2, 3) != ':') return false;
	    return true;
	  })
	  .map((el) => {
	  	const data = JSON.parse(localStorage.getItem(el));
	    data.push(el);
	    return data;
	  })
	  .sort((a, b) => {
	    if (a[1].slice(12) != b[1].slice(12)) {
			  return a[1].slice(12) - b[1].slice(12)
		  } else if (a[1].slice(9, 11) != b[1].slice(9, 11)) {
			  return a[1].slice(12) - b[1].slice(12)
			} else if (a[1].slice(6, 8) != b[1].slice(6, 8)) {
		    return a[1].slice(12) - b[1].slice(12)
			} else if (a[1].slice(0, 2) != b[1].slice(0, 2)) {
		    return a[1].slice(0, 2) - b[1].slice(0, 2)
			} else {
			  return a[1].slice(3, 5) - b[1].slice(3, 5)
			}  
	  })
	  .map((el) => {
	    const text = el[0];
		  const time = el[1];
		  const title = el[2];
		  addNote();
		  saveInfo({}, title, text, time);
		  return el;
	  });

  if (activeNote[0]) activeNote[0].classList.remove('activeNote');
  activeNote = [null, null];
  location.href = baseURL + '#';

	if (activeNoteName) {
		
		for (const key of notes) {
		  
		  if (key['title'].replace(/\s+/g, '') === activeNoteName) {
		    changeActiveNote(activeNote, key['div']);
		    break;
		  }
		  
		  if (notes.indexOf(key) === (notes.length - 1)) {
		    alert('This note doesn`t exists');
		    location.href = baseURL + '#';
		  }
		}
	
	};
}

refreshPage();

addNoteButton.addEventListener(('click'), addNote);
saveInfoButton.addEventListener(('click'), saveInfo);
removeNoteButton.addEventListener(('click'), removeNote);
