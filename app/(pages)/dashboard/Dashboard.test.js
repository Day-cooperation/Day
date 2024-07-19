import { customRender } from '@/test-utils/TestProvider';
import Dashboard from './page';
import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';

describe('Dashboard Page', () => {
  test('Dashboard page 랜더링', async () => {
    customRender(<Dashboard />);
    await waitForElementToBeRemoved(() => screen.getAllByRole('heading', { name: /loading/i }));

    const todoList = screen.getAllByText(/First Todo/i);
    const goalList = screen.getAllByText(/First Goal/i);

    expect(screen.getByRole('heading', { name: '대시보드' })).toBeInTheDocument();
    // recently todo 데이터 및 element 요소 랜더링
    expect(screen.getByRole('heading', { name: '최근 등록한 할 일' })).toBeInTheDocument();
    expect(screen.getByText('모두 보기')).toBeInTheDocument();

    todoList.forEach((item) => expect(item).toBeInTheDocument());
    // 요소가 없을 때 getBy는 에러를 던짐, queryBy는 null, 즉 없는것을 검사할때는 query를 사용
    // 데이터가 있으므로 이 멘트는 보이지 않아야 함
    expect(screen.queryByText('최근 등록한 할 일이 없어요')).not.toBeInTheDocument();

    // cardGoal 요소 랜더링
    expect(screen.getByRole('heading', { name: '목표 별 할 일' })).toBeInTheDocument();
    // goal title 데이터 랜더링 테스트
    goalList.forEach((item) => expect(item).toBeInTheDocument());
  });

  test('모두 보기 속성 href /dashboard', async () => {
    customRender(<Dashboard />);
    await waitForElementToBeRemoved(() => screen.getAllByRole('heading', { name: /loading/i }));

    expect(screen.getByRole('link', { name: '모두 보기' })).toHaveAttribute('href', '/todolist');
  });

  test('Card Goal 3개만 보이기', async () => {
    customRender(<Dashboard />);
    await waitForElementToBeRemoved(() => screen.getAllByRole('heading', { name: /loading/i }));

    expect(screen.getByRole('heading', { name: 'First Goal' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Second Goal' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Third Goal' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Fourth Goal' })).not.toBeInTheDocument();
  });

  test('Card Goal 할일 추가 시 모달 띄우기', async () => {
    customRender(<Dashboard />);
    await waitForElementToBeRemoved(() => screen.getAllByRole('heading', { name: /loading/i }));

    const addTodoButton = screen.getAllByRole('button', { name: '할일 추가' })[0];
    fireEvent.click(addTodoButton);
    expect(screen.getByRole('heading', { name: '할 일 생성' })).toBeInTheDocument();
  });
});
