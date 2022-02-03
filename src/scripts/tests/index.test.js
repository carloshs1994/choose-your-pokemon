import { displayPokemons, displayLikes, displaySeeMoreButton } from '../modules/generators.js';
import itemsCounter from '../modules/util.js';
import triggerEvent from '../modules/triggerEvent.js';

jest.mock('../modules/APIhandling');
jest.mock('../modules/comments');

describe('Home Page Tests', () => {
  test('Generates ul of cards', async () => {
    document.body.innerHTML = '<main></main>';

    await displayPokemons(2);

    const cards = document.querySelectorAll('li');
    expect(cards).toHaveLength(2);
  });
  test('Display all like items', async () => {
    document.body.innerHTML = '<ul><li id="pokemon-1"><p class="likes">0 Likes</p><li></ul>';

    await displayLikes();

    const likes = document.querySelector('p');
    expect(likes.textContent).toBe('5 Likes');
  });
  test('Items Counter', () => {
    document.body.innerHTML = `
      <ul>
        <li class="card"></li>
        <li class="card"></li>
        <li class="card"></li>
        <li class="card"></li>
        <li class="card"></li>
        <li class="card"></li>
        <li class="card"></li>
        <li class="card"></li>
        <li class="card"></li>
        <li class="card"></li>
        <li class="card"></li>
        <li class="card"></li>
        <li class="card"></li>
        <li class="card"></li>
        <li class="card"></li>
      </ul>
    `;

    const count = itemsCounter();

    expect(count).toBe(15);
  });
  test('Display More Button', async () => {
    document.body.innerHTML = `
    <header>
      <nav>
        <a id="pokemonTag"></a>
      </nav>
    </header>
    <main></main>
    <section class="popup">
      <span class="popup-close"></span>
      <div class="popup-add-comments">
        <h3>Add a comment</h3>
        <form id="form" class="form" action="#" method="post">
          <input type="text" id="username" name="user" placeholder="Your name" required maxlength="100">
          <textarea name="comment" id="comment" maxlength="100" placeholder="Your insights" required></textarea>
          <button id="comment-btn" type="submit">Submit</button>
        </form>
        <div class="modal-container">
          <p>Comment has been added</p>
        </div>
      </div>
    </section>
    `;

    displaySeeMoreButton();

    const seeMore = document.querySelector('.see-more');

    triggerEvent(seeMore, 'click');

    setTimeout(() => {
      const cards = document.querySelectorAll('.card');
      expect(cards).toHaveLength(10);
    }, 1000);
  });
});