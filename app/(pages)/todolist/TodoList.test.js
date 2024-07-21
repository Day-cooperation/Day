import { customRender } from '@/test-utils/TestProvider';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import TodoList from './page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('todolist page', () => {
  let buttonAllElement;
  let buttonDoneElement;
  let buttonTodoElement;

  const mockPush = jest.fn();
  useRouter.mockReturnValue({ push: mockPush });

  beforeEach(async () => {
    customRender(<TodoList />);

    buttonAllElement = await screen.findByLabelText(/all/i);
    buttonDoneElement = screen.getByLabelText(/done/i);
    buttonTodoElement = screen.getByLabelText(/to do/i);
  });

  test('랜더링 확인', () => {
    expect(buttonAllElement).toBeInTheDocument();
    expect(buttonDoneElement).toBeInTheDocument();
    expect(buttonTodoElement).toBeInTheDocument();
    expect(screen.getByText(/first todo/i)).toBeInTheDocument();
    expect(screen.getByText(/first goal/i)).toBeInTheDocument();
  });

  test('랜더링 초기 filter 는 All 이어야 한다,', () => {
    expect(buttonAllElement).toHaveClass('bg-blue-500');
    expect(buttonDoneElement).not.toHaveClass('bg-blue-500');
    expect(buttonTodoElement).not.toHaveClass('bg-blue-500');
  });

  test('filter 의 Done 버튼을 누르면 Done:true 인 리스트만 보여야한다', async () => {
    fireEvent.click(buttonDoneElement);

    await waitFor(() => {
      expect(buttonAllElement).not.toHaveClass('bg-blue-500');
    });
    expect(buttonDoneElement).toHaveClass('bg-blue-500');

    expect(screen.getByText(/first todo/i)).toBeInTheDocument();
    expect(screen.getByText(/Third todo/i)).toBeInTheDocument();
    expect(screen.queryByText(/second todo/i)).not.toBeInTheDocument();
  });

  /* jest에서 현재 테일윈드의 group-hover 기능을 인식 못하는 이슈있음. test('list의 마우스를 호버 하면 기본적으로 note-write 와 kebab이 보여야 한다', async () => {
    const listEl = screen.getByText(/first todo/i);

    const noteWriteEl = screen.queryAllByLabelText(/note-write/i)[0];

    expect(noteWriteEl).not.toBeVisible();
    fireEvent.mouseEnter(listEl);
    expect(await screen.findAllByLabelText(/note-write/i)[0]).toBeVisible();
  });*/
  test('note-write 버튼을 클릭하면 페이지 이동이 이뤄져야 한다.', () => {
    const noteWrtieEl = screen.getAllByLabelText(/note-write/i)[0];
    fireEvent.click(noteWrtieEl);
    expect(mockPush).toHaveBeenCalledWith('/note/write/1');
  });
});
