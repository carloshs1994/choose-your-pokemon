import { displayPokemons, displayLikes } from '../modules/generators.js';

jest.mock('../modules/APIhandling');

describe('Home Page Tests', () => {
  test('Generates ul of cards', async () => {
    document.body.innerHTML = '<main></main>';

    await displayPokemons();

    const cards = document.querySelectorAll('li');
    expect(cards).toHaveLength(3);
  });
  test('Display all like items', async () => {
    document.body.innerHTML = '<ul><li id="pokemon-1"><p class="likes">0 Likes</p><li></ul>';

    await displayLikes();

    const likes = document.querySelector('p');
    expect(likes.textContent).toBe('5 Likes');
  });
});