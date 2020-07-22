'use strict';

import * as API from './server';
import refs from './mainPage';
import queueTemplate from '../templates/queue-page.hbs';
import '../styles/queue.css';
import PNotify from '../../node_modules/pnotify/dist/es/PNotify.js';
// import './node_modules/pnotidistfy//PNotifyBrightTheme.css';
import '../../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import './inner_page';

let filmsInQueue;

// const queueList = document.querySelector('#queue_list');

// if (JSON.parse(localStorage.getItem('movieInQueue'))) {
//   loadedLocalStorageQueue(JSON.parse(localStorage.getItem('movieInQueue')));
// }

export const toggleQueue = event => {
  // console.log(event.target);
  // console.dir(event.target.textContent);
  if (event.target.classList.contains('added')) {
    deleteFromQueue(event);
    event.target.classList.remove('added');
    event.target.classList.add('video-icon');
    event.target.classList.remove('video-icon-remove');
    event.target.textContent = 'Add to queue';
  } else {
    addInQueue(event);
    event.target.classList.add('added');
    event.target.classList.remove('calendar-icon');
    event.target.classList.add('calendar-icon-remove');
    event.target.textContent = 'Remove from queue';
  }
};

// refs.btn.addEventListener('click', addInQueue);
// refs.delBtn.addEventListener('click', deleteFromQueue);

function loadedLocalStorageQueue(arr) {
  const parsedQueue = arr;
  const startMarkup = parsedQueue.map(item => buildMarkup(item)).join('');
  console.log(startMarkup);
  insertMarkup(startMarkup);
}

function addInQueue(event) {
  const filmId = event.target.dataset.id;
  filmsInQueue = JSON.parse(localStorage.getItem('movieInQueue')) || [];
  API.getMovieByID(filmId).then(result => {
    const { data } = result;
    if (!filmsInQueue.find(movieInQueue => movieInQueue.id === data.id)) {
      filmsInQueue.push(data);
      localStorage.setItem('movieInQueue', JSON.stringify(filmsInQueue));
      // addMarkup(data);
    }
  });
}

function deleteFromQueue(event) {
  const filmIdToDelete = Number(event.target.dataset.id);
  const filmsInQueue = JSON.parse(localStorage.getItem('movieInQueue')) || [];
  if (filmsInQueue.find(movieInQueue => movieInQueue.id === filmIdToDelete)) {
    const filteredFilms = filmsInQueue.filter(
      movieInQueue => movieInQueue.id !== filmIdToDelete,
    );
    localStorage.setItem('movieInQueue', JSON.stringify(filteredFilms));
  }
  // updateMarkup();
}

function addMarkup(items) {
  const markup = buildMarkup(items);
  insertMarkup(markup);
}

function buildMarkup(items) {
  return queueTemplate(items);
}

function insertMarkup(markup) {
  refs.queueList.insertAdjacentHTML('beforeend', markup);
}

function updateMarkup() {
  refs.queueList.innerHTML = ' ';
  filmsInQueue = JSON.parse(localStorage.getItem('movieInQueue'));
  const newMarkup = filmsInQueue.map(item => buildMarkup(item));
  insertMarkup(newMarkup);
}

export const showQueueFilms = () => {
  refs.queueList.innerHTML = '';
  refs.filmPage.innerHTML = ' ';
  refs.listArticle.innerHTML = ' ';
  refs.listWatch.innerHTML = ' ';
  refs.searchInput.classList.add('hidden');
  refs.paginationBox.classList.add('hidden');
  refs.navBtns.classList.remove('hidden');
  // console.log(JSON.parse(localStorage.getItem('movieInQueue')));
  if (JSON.parse(localStorage.getItem('movieInQueue'))) {
    loadedLocalStorageQueue(JSON.parse(localStorage.getItem('movieInQueue')));
  }
};

export const notifyAction = libraryName => {
  PNotify.success({
    text: `Added to ${libraryName}`,
    animation: 'fade',
    delay: 2000,
    stack: {
      dir1: 'up',
      dir2: 'left', // zPosition from the top left corner.
      firstpos1: 90,
      firstpos2: 90, // 90px from the top, 90px from the left.
    },
    Mobile: {
      swipeDismiss: true,
      styling: true,
    },
  });
};
