import { refs } from './refs';

export function appendMarkup(data) {
  refs.divImgContainer.insertAdjacentHTML('beforeend', createMarkup(data));
}

export function createMarkup(data) {
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
