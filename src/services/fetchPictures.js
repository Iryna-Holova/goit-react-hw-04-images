const URL = 'https://pixabay.com/api/';
const API_KEY = '27839370-99dd6ddd44ecd058cc6f2562b';

export default async function fetchPictures(query, page) {
    const response = await fetch(`${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    const data = await response.json();
    return data.hits;
}