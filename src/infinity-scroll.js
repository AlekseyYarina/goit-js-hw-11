import ImagesApi from './img-api';
import { appendMarkup } from './markup';
const imagesApi = new ImagesApi();

let options = {
    root: null,
    rootMargin: "800px",
    threshold: 1.0,
};

export let observer = new IntersectionObserver (onLoad, options);

export async function onLoad(entries, observer) {
    console.log(entries);
    entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
            const data = await imagesApi.fetchImages();
            appendMarkup(data);
        }
    });
}

