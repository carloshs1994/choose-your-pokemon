import displayPokemons from '../modules/generators.js';

jest.mock('../modules/APIhandling');

describe('Home Page Tests', () => {
  test('Generates ul of cards', async () => {
    document.body.innerHTML = '<main></main>';

    await displayPokemons();

    const cards = document.querySelectorAll('li');
    expect(cards).toHaveLength(3);
  });
});