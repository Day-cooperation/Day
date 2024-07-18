import { Goal, Todo } from '@/types/Todo';
import { convertTodoToFormdata } from './convertTodoToFormdata';

describe('convertTodoToFormdata', () => {
  test('should return default NewTodo when no todo is provided', () => {
    const expected = { title: '', fileUrl: '', linkUrl: '', goalId: 0, done: false };
    expect(convertTodoToFormdata()).toEqual(expected);
  });

  test('should convert Todo to NewTodo correctly', () => {
    const goal: Goal = { id: 1, title: 'Test Goal' };
    const todo: Todo = {
      noteId: 1,
      done: true,
      linkUrl: 'test-link-url',
      fileUrl: 'test-file-url',
      title: 'Test Todo',
      id: 1,
      goal,
      userId: 1,
      teamId: 'team-1',
      updatedAt: '2023-01-01',
      createdAt: '2023-01-01',
    };

    const expected = {
      title: 'Test Todo',
      fileUrl: 'test-file-url',
      linkUrl: 'test-link-url',
      goalId: 1,
      done: true,
    };

    expect(convertTodoToFormdata(todo)).toEqual(expected);
  });
});
