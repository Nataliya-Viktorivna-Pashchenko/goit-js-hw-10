import axios from 'axios';
axios.defaults.headers.common['x-api-key'] = 'live_50apQWtZtrGVGOGdQcxsCmwOTB8oY2SUYO3PyJfdOGmqEwMIPxJfz4cXbrJCWt52';
const API_URL = 'https://api.thecatapi.com/v1/breeds';
const SEARCH_URL = `https://api.thecatapi.com/v1/images/search`;
 
  
function fetchBreeds() {
    return axios(`${API_URL}`).then(res => {
        if (res.status === 200) {
      return  res.data;
    }

    throw new Error(res.statusText);
        
        
    })

};


function fetchCatByBreed(breedId) {
    return axios(`${SEARCH_URL}?breed_ids=${breedId}`)
        .then(date => {
            return date;
        })

};
export { fetchBreeds, fetchCatByBreed };