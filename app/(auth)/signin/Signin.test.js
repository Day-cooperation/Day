import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Signin from './page';
import { customRender } from '@/test-utils/TestProvider';
import { server } from '@/mocks/server';

// 중요한 테스트는 실제 server but 그리 중요하지 않은것은 mock server
// navigation 목
jest.mock('next/navigation');

describe('Signin Page', () => {

  // 목 서버 실행
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  
  // 목함수 선언
  const mockRouterPush = jest.fn();
  beforeEach(() => {
    // useRouter.push()할 때 mockRouterPush 호출
    useRouter.mockReturnValue({ push: mockRouterPush });
    customRender(<Signin />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('로그인 폼 렌더링', () => {
    expect(screen.getByLabelText('이메일')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
  });

  test('빈 input 일 시 에러 메시지', async () => {
    const loginBtn = screen.getByRole('button', { name: '로그인' });
    fireEvent.click(loginBtn);

    expect(await screen.findByText(/이메일을 입력해주세요/)).toBeInTheDocument();
    expect(await screen.findByText(/패스워드를 입력해주세요/)).toBeInTheDocument();
  });

  test('이메일 형식 다를 시 에러 메시지', async () => {
    fireEvent.change(screen.getByLabelText(/이메일/), { target: { value: 'tttt' } });

    expect(await screen.findByText(/올바른 이메일이 아닙니다/)).toBeInTheDocument();
  });

  test('비밀번호 형식 다를 시 에러 메시지', async () => {
    fireEvent.change(screen.getByLabelText(/비밀번호/), { target: { value: 'aaaa' } });
    expect(await screen.findByText(/비밀번호가 8자 이상이 되도록 해 주세요/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/비밀번호/), { target: { value: 'aaaaaaaa' } });
    expect(await screen.findByText(/알파벳과 숫자를 섞어 입력해주세요/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/비밀번호/), { target: { value: '11111111' } });
    expect(await screen.findByText(/알파벳과 숫자를 섞어 입력해주세요/)).toBeInTheDocument();
  });

  test('가입되어 있지 않은 이메일 에러메시지', async () => {
    fireEvent.change(screen.getByLabelText(/이메일/), { target: { value: 'notExist@example.com' } });
    fireEvent.change(screen.getByLabelText(/비밀번호/), { target: { value: 'password123' } });

    fireEvent.submit(screen.getByRole('button', { name: /로그인/ }));

    expect(await screen.findByText(/가입되지 않은 이메일입니다/)).toBeInTheDocument();
  });

  test('비밀번호 틀렸을 때 이메일 에러메시지', async () => {
    fireEvent.change(screen.getByLabelText(/이메일/), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText(/비밀번호/), { target: { value: 'password123' } });

    fireEvent.submit(screen.getByRole('button', { name: /로그인/ }));

    expect(await screen.findByText(/비밀번호가 올바르지 않습니다/)).toBeInTheDocument();
  });

  test('로그인 성공 시 /dashboard로 리다이렉트', async () => {
    fireEvent.change(screen.getByLabelText(/이메일/), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText(/비밀번호/), { target: { value: 'test1234' } });

    fireEvent.submit(screen.getByRole('button', { name: /로그인/ }));

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/dashboard');
    });
  });
});
