import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error')

loader.classList.replace('loader', 'hidden')
error.hidden = true;

fetchBreeds()
  .then(breeds => {
            
            new SlimSelect({
              select: breedSelect,
                 data:
              
                    breeds.forEach(breed => {
                        const option = document.createElement("option");
                        option.value = breed.id;
                        option.textContent = breed.name;
                        breedSelect.appendChild(option);
                    }),
            });
        })
        .catch(error => {

    Notify.failure(`Oops!...Something went wrong!!!   
                     Try reloading the page!!!`);
             });




function onChange(e) {
  loader.classList.replace('hidden', 'loader');
  catInfo.hidden = true;
  breedSelect.hidden = true;
 
  const breedId = e.currentTarget.value;
  
  fetchCatByBreed(breedId)
    .then(data => {
               
          const catData = data.data[0];

          const cat = `
      <h2>${catData.breeds[0].name}</h2>
      <p> ${catData.breeds[0].description}</p>
      <img src="${catData.url}" alt="${catData.breeds[0].name}"  width = 500px/>
    `;
        
          catInfo.innerHTML = cat;
      catInfo.hidden = false;
       loader.classList.replace('loader', 'hidden');
     
    })
  .catch(error => {

    Notify.failure(`Oops!...Something went wrong!!!   
                     Try reloading the page!!!`);
             });;
};

breedSelect.addEventListener('change', onChange);
