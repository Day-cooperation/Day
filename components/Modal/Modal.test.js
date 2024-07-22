import { customRender } from '@/test-utils/TestProvider';
import Modal from './Modal';
import { mockGoalList, mockTodoList } from '@/mocks/mockResponse';
import { fireEvent, screen, within } from '@testing-library/react';

describe('Modal Component', () => {
  test('할일 생성 렌더링', () => {
    customRender(<Modal isOpen modalType='create' onClose={jest.fn()} />);

    expect(screen.getByText('할 일 생성')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('할 일의 제목을 적어주세요')).toBeInTheDocument();
    expect(screen.getByText('파일 업로드')).toBeInTheDocument();
    expect(screen.getByText('링크 첨부')).toBeInTheDocument();
    expect(screen.getByText('목표')).toBeInTheDocument();
  });

  test('할 일 수정 렌더링', async () => {
    customRender(<Modal isOpen modalType='edit' onClose={jest.fn()} items={mockTodoList.todos[0]} />);

    expect(screen.getByText('할 일 수정')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(await screen.findByDisplayValue(mockTodoList.todos[0].title)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(mockGoalList.goals[0].title)).toBeInTheDocument();
    // 확인버튼 disabled되지 않아야 함
    expect(await screen.findByRole('button', { name: '확인' })).not.toBeDisabled();
  });

  test('닫기 버튼 누를 시 confirm 창 렌더링', () => {
    HTMLDialogElement.prototype.showModal = jest.fn();

    customRender(<Modal isOpen modalType='edit' onClose={jest.fn()} />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(screen.getByText('작성된 내용이 모두 삭제됩니다.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
  });

  test('링크 첨부', () => {
    customRender(<Modal isOpen modalType='create' onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('링크 첨부'));

    const label = screen.getByText('링크');

    expect(screen.getByText('링크 업로드')).toBeInTheDocument();
    const input = within(label).getByPlaceholderText(/영상이나 글/);
    fireEvent.change(input, { target: { value: 'naver.com' } });
    const button = screen.getByRole('button', { name: '확인' });
    fireEvent.click(button);

    expect(screen.getByDisplayValue('naver.com')).toBeInTheDocument();
  });

  test('파일 업로드', () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    customRender(<Modal isOpen modalType='create' onClose={jest.fn()} />);
    let input = screen.getByText('파일을 업로드해주세요');
    fireEvent.change(input, {
      target: { files: [file] },
    });

    expect(input.files[0].name).toBe('test.png');
  });

  test('목표 선택', async () => {
    customRender(<Modal isOpen modalType='create' onClose={jest.fn()} />);
    fireEvent.click(screen.getByLabelText('select subject'));

    expect(await screen.findByText('First Goal')).toBeInTheDocument();
    expect(await screen.findByText('Second Goal')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByText('Second Goal'));

    expect(await screen.findByText('Second Goal')).toBeInTheDocument();
  });
});