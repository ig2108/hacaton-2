'use strict';

import * as API from './server';
import refs from './refs';
import queueTemplate from '../templates/queue-page.hbs';

let filmsInQueue;

if (JSON.parse(localStorage.getItem('movieInQueue'))) {
  loadedLocalStorageQueue(JSON.parse(localStorage.getItem('movieInQueue')));
}

refs.btn.addEventListener('click', addInQueue);
refs.delBtn.addEventListener('click', deleteFromQueue);

function loadedLocalStorageQueue(arr) {
  const parsedQueue = arr;
  const startMarkup = parsedQueue.map(item => buildMarkup(item));
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
      addMarkup(data);
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
  updateMarkup();
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
