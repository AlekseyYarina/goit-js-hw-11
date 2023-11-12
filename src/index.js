import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import ImagesApi from './img-api';
const imagesApi = new ImagesApi();

const refs = {
  form: document.querySelector('#search-form-js'),
  searchBtn: document.querySelector('#btn-search-js'),
  loadMoreBtn: document.querySelector('#load-more-js'),
  divImgContainer: document.querySelector('#gallery-js'),
  likesContent: document.querySelector('.likes-content-js'),
  viewsContent: document.querySelector('.views-content-js'),
  commentsContent: document.querySelector('.comments-content-js'),
  downloadsContent: document.querySelector('.downloads-content-js'),
};

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  imagesApi.query = e.currentTarget.elements.searchQuery.value;
  imagesApi.resetPage();
  hideLoadmoreBtn();
  refs.divImgContainer.innerHTML = '';
  imagesApi.fetchImages().then(data => {
    if (data.hits.length !== 0) {
      notifyQuantityOfMatches(data.total);
      appendMarkup(data);
      showLoadmoreBtn();
      const lightbox = new simpleLightbox('.gallery a');
    } else {
      notifyNoMatches();
    }
  });
}

function onLoadMore() {
  imagesApi.fetchImages().then(data => {
    appendMarkup(data);

    const totalDisplayedImages =
      document.querySelectorAll('.image-link').length;
    const totalHits = data.total;

    if (totalDisplayedImages >= totalHits) {
      hideLoadmoreBtn();
      notifyEndOfResults();
    }
  });
}

function showLoadmoreBtn() {
  refs.loadMoreBtn.classList.remove('visually-hidden');
}

function hideLoadmoreBtn() {
  if (refs.loadMoreBtn.classList.contains('visually-hidden')) {
    return;
  }
  refs.loadMoreBtn.classList.add('visually-hidden');
}

function notifyEndOfResults() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

function notifyQuantityOfMatches(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

function notifyNoMatches() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function appendMarkup(data) {
  refs.divImgContainer.insertAdjacentHTML('beforeend', createMarkup(data));
}

function createMarkup(data) {
  return data.hits
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a href="${largeImageURL}" class="image-link">
    <div class="image-item">
      <img class = "img" src="${webformatURL}" alt="${tags}" loading="lazy" />
       <div class="info-overlay">
        <div class="info-item">
          <p class="item-desk">Likes</p>
          <p class="likes-content-js">${likes}</p>
        </div>
        <div class="info-item">
        <p class="item-desk">Views</p>
          <p class="views-content-js">${views}</p>
        </div>
        <div class="info-item">
        <p class="item-desk">Comments</p>
          <p class="comments-content-js">${comments}</p>
        </div>
        <div class="info-item">
        <p class="item-desk">Downloads</p>
          <p class="downloads-content-js">${downloads}</p>
        </div>
      </div>
    </div>
  </a>`
    )
    .join('');
}
