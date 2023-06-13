import SlimSelect from 'slim-select';

new SlimSelect({
  select: '#selectElement',
  settings: {
    openPosition: 'auto',
  },
});
import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const catInfo = document.querySelector('.cat-info');
  const loader = document.querySelector('.loader');
  const errorDisplay = document.querySelector('.error');

  async function populateBreeds() {
    try {
      loader.style.display = 'block';
      breedSelect.style.display = 'none';
      const breeds = await fetchBreeds();
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
      breedSelect.style.display = 'block';
    } catch (error) {
      errorDisplay.style.display = 'block';
      console.error('Error populating breeds:', error);
    } finally {
      loader.style.display = 'none';
    }
  }

  async function fetchAndDisplayCatInfo(breedId) {
    try {
      loader.style.display = 'block';
      catInfo.style.display = 'none';
      const cat = await fetchCatByBreed(breedId);
      catInfo.innerHTML = `
        <img src="${cat.url}" alt="Cat Image">
        <h2>${cat.breeds[0].name}</h2>
        <p>Description: ${cat.breeds[0].description}</p>
        <p>Temperament: ${cat.breeds[0].temperament}</p>
      `;
      catInfo.style.display = 'block';
    } catch (error) {
      errorDisplay.style.display = 'block';
      console.error('Error fetching cat information:', error);
    } finally {
      loader.style.display = 'none';
    }
  }

  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;
    fetchAndDisplayCatInfo(selectedBreedId);
  });

  populateBreeds();
});
