import { mockTodoList } from '@/mocks/mockResponse';
import ListTodo from './ListTodo';
import { fireEvent, render, screen } from '@testing-library/react';

describe('listTodo 컴포넌트', () => {
  test('listTodo 랜더링', () => {
    render(<ListTodo todos={mockTodoList.todos} onButtonClick={jest.fn()} showGoal />);

    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.getByText('First Goal')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
    expect(screen.getByText('Second Goal')).toBeInTheDocument();
  });

  test('todo 클릭', () => {
    const handleButtonClick = jest.fn();
    render(<ListTodo todos={mockTodoList.todos} onButtonClick={handleButtonClick} showGoal />);

    fireEvent.click(screen.getByText('First Todo'));
    expect(handleButtonClick).toHaveBeenCalledWith('done', 1);
  });

  test('todo 옵션 버튼 클릭', () => {
    const handleButtonClick = jest.fn();
    render(<ListTodo todos={mockTodoList.todos} onButtonClick={handleButtonClick} showGoal />);

    fireEvent.click(screen.getAllByLabelText('file')[0]);
    expect(handleButtonClick).toHaveBeenCalledWith('file', 1);

    fireEvent.click(screen.getAllByLabelText('link')[0]);
    expect(handleButtonClick).toHaveBeenCalledWith('link', 1);

    fireEvent.click(screen.getAllByLabelText('note-read')[0]);
    expect(handleButtonClick).toHaveBeenCalledWith('note read', 1);

    fireEvent.click(screen.getAllByLabelText('note-write')[0]);
    expect(handleButtonClick).toHaveBeenCalledWith('note write', 1);
  });

  test('todo popover 버튼 클릭 및 popover 요소 랜더링', () => {
    const handleButtonClick = jest.fn();
    render(<ListTodo todos={mockTodoList.todos} onButtonClick={handleButtonClick} showGoal />);

    fireEvent.click(screen.getAllByLabelText('popover')[0]);
    expect(screen.getByText('삭제하기')).toBeInTheDocument();
    expect(screen.getByText('수정하기')).toBeInTheDocument();
  });
});
