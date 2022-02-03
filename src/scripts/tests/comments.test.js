import { commentCounter } from '../modules/comments.js';

describe('Comment section test', () => {
  test('should return cero if the array is empty', () => {
    const arr = [];
    expect(commentCounter(arr)).toBe(0);
  });
  test('should return cero if we pass an object', () => {
    const obj = {
      error: 'Key is not defined',
      status: '400',
    };
    expect(commentCounter(obj)).toBe(0);
  });
  test('should return 2 if the array length is 2', () => {
    const arr = [{ username: 'CHS' }, { username: 'John Titor' }];
    expect(commentCounter(arr)).toBe(2);
  });
});