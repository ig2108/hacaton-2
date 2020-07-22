'use strict';

// import * as API from './server';
// import refs from './refs';
// import queueTemplate from '../templates/queue-page.hbs';

// const filmsIdInQueue = [];

// function addedFilmInQueue(event) {
//   // const filmId = event.target.dataset.id;
//   // // console.log(filmId);
//   // if (filmsIdInQueue.includes(filmId)) {
//   //   return;
//   // }
//   // filmsIdInQueue.push(filmId);
//   // console.log(filmsInQueue);
//   // const filmsFullInfo = getFilmsFullInfo(filmsIdInQueue);
//   // console.log(filmsFullInfo);
//   // const markup = buildMarkup(filmsFullInfo);
//   // console.log(markup);
//   // getFilmsFullInfo(filmsIdInQueue);
//   // return filmsInQueue;
// }

// function getFilmsFullInfo(event) {
//   const filmId = event.target.dataset.id;
//   // console.log(filmId);
//   // if (filmsIdInQueue.includes(filmId)) {
//   //   return;
//   // }
//   filmsIdInQueue.push(filmId);
//   // console.log(filmsIdInQueue);
//   const filmsFullInfo = [];
//   // let result;

//   filmsIdInQueue.map(filmIdInQueue =>
//     API.getMovieByID(filmIdInQueue).then(result => {
//       const { data } = result;
//       filmsFullInfo.push(data);
//       console.log(filmsFullInfo);
//       const markup = buildMarkup(filmsFullInfo);
//       console.log(markup);
//       insertMarkup(markup);
//     }),
//   );
//   return;
// }

// function buildMarkup(items) {
//   return queueTemplate(items);
// }

// function insertMarkup(markup) {
//   refs.queueList.insertAdjacentHTML('beforeend', markup);
// }

// refs.btnAddQueue.addEventListener('click', getFilmsFullInfo);

