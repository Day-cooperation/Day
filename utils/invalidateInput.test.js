import { invalidateInput } from './invalidateInput';

const data = { todoId: 1, title: '123', content: '123', linkUrl: null };
const inputValue = { todoId: 1, title: '123', content: '123', linkUrl: null };

test('객체를 비교하여 동등할 경우 false를 반환 이 테스트의 경우 false반환되어야 한다', () => {
  expect(invalidateInput(data, inputValue)).toEqual(false);
});
test('객체의 다른값 하나라도 있다면 true 를 반환해야 한다. ', () => {
  inputValue.title = '12';
  expect(invalidateInput(data, inputValue)).toEqual(true);
});
