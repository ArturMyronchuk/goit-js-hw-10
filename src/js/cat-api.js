const API_KEY =
  'live_eD2mipMQAQofxsK0z5lUXpLFzMjXhz2aJxoxdyORbr5i8QvnYr3TUQDT7CCP0Glv';

export async function fetchBreeds() {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key': API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch breeds');
    }
    const data = await response.json();
    return data.map(breed => ({ id: breed.id, name: breed.name }));
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error;
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
      {
        headers: {
          'x-api-key': API_KEY,
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch cat information');
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error('Error fetching cat information:', error);
    throw error;
  }
}
