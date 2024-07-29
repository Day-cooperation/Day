import { customRender } from '@/test-utils/TestProvider';
import Note from './page';
import { useParams, useRouter } from 'next/navigation';
import { fireEvent, screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('react-quill-new', () => {
  return ({ value }) => <div dangerouslySetInnerHTML={{ __html: value }} />;
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('note-w/e page', () => {
  const mockRouterBack = jest.fn();
  useRouter.mockReturnValue({ back: mockRouterBack });
  beforeEach(() => {
    customRender(<Note />);
  });
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('랜더링 시 noteId가 있는 경우(todoId: "1") 노트 수정이여야한다.', async () => {
    useParams.mockReturnValue({ todoId: '1' });
    const headerTitleEl = await screen.findByRole('heading', { name: '노트 수정' });
    expect(headerTitleEl).toBeInTheDocument();
  });

  test('noteId가 없는 경우(todoId: "2") 노트 작성 이여야 한다', async () => {
    useParams.mockReturnValue({ todoId: '2' });
    const headerTitleEl = await screen.findByRole('heading', { name: '노트 작성' });
    expect(headerTitleEl).toBeInTheDocument();
  });

  test('목표가 없는 경우 "설정된 목표가 없어요" 라는 문자를 보여준다', async () => {
    useParams.mockReturnValue({ todoId: '5' });
    const goalTitleEl = await screen.findByText('설정된 목표가 없어요.');
    expect(goalTitleEl).toHaveClass('text-slate-300');
  });

  test('noteId가 있는 경우 title, content (title,content는 필수) 랜더링 시 title은 "Title Test"를 보여주고 content는 "<p>Example Test Content<p>"를 보여주어야한다', async () => {
    useParams.mockReturnValue({ todoId: '1' });
    await waitForElementToBeRemoved(() => screen.getAllByLabelText(/loading/i));

    const noteTitleEl = await screen.findByText(/title test/i);
    const contentEl = screen.getByText(/example content test/i);
    expect(noteTitleEl).toBeInTheDocument();
    expect(contentEl).toHaveStyle({ color: 'rgb(230, 0, 0)' });
  });

  test('임시 저장을 누르면 "임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?" 라는 문자열을 보여주고 localStorage에 저장한다', async () => {
    useParams.mockReturnValue({ todoId: '1' });
    await waitForElementToBeRemoved(() => screen.getAllByLabelText(/loading/i));

    const buttonEl = await screen.findByRole('button', { name: '임시저장' });
    await screen.findByText(/title test/i);
    fireEvent.click(buttonEl);

    expect(await screen.findByText('임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?')).toBeInTheDocument();
    await waitFor(() => {
      expect(localStorage.getItem('title')).toEqual('Title Test');
    });
  });

  test('"title" or "content"를 변경하고 노트 작성, 노트 수정을 누르면 이전 페이지로 이동한다', async () => {
    useParams.mockReturnValue({ todoId: '1' });
    await waitForElementToBeRemoved(() => screen.getAllByLabelText(/loading/i));

    const inputEl = await screen.findByPlaceholderText('노트의 제목을 입력해주세요');

    fireEvent.change(inputEl, { target: { value: 'new title' } });
    expect(inputEl.value).toEqual('new title');

    const noteEditEl = screen.getByRole('button', { name: '수정 하기' });

    fireEvent.click(noteEditEl);

    await waitFor(() => {
      expect(mockRouterBack).toHaveBeenCalled();
    });
  });
});
