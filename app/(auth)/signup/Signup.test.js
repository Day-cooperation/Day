import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Signup from './page';
import { customRender } from '@/test-utils/TestProvider';
import { server } from '@/mocks/server';

// navigation 목
jest.mock('next/navigation');

describe('Signup Page', () => {

  // 목 서버 실행
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  // 목함수 선언
  const mockRouterPush = jest.fn();
  beforeEach(() => {
    // useRouter.push()할 때 mockRouterPush 호출
    useRouter.mockReturnValue({ push: mockRouterPush });

    customRender(<Signup />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('회원가입 폼 렌더링', () => {
    expect(screen.getByLabelText('이메일')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호 확인')).toBeInTheDocument();
  });

  test('이름 입력 안할 시 에러 메시지', async () => {
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'setset123' } });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), { target: { value: 'setset123' } });
    fireEvent.submit(screen.getByRole('button', { name: '회원가입하기' }));

    expect(await screen.findByText('이름을 입력해주세요.')).toBeInTheDocument();
  });

  test('비밀번호 확인 다를 시 에러 메시지', async () => {
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'setset123' } });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), { target: { value: 'setset1233' } });
    expect(await screen.findByText('비밀번호가 일치하지 않습니다.')).toBeInTheDocument();
  });

  test('이메일 존재할 시 에러 메시지', async () => {
    fireEvent.change(screen.getByLabelText('이름'), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'setset123' } });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), { target: { value: 'setset123' } });
    fireEvent.submit(screen.getByRole('button', { name: '회원가입하기' }));

    expect(await screen.findByText('이미 사용 중인 이메일입니다.')).toBeInTheDocument();
  });

  test('회원가입 성공 시 /dashboard로 리다이렉트', async () => {
    fireEvent.change(screen.getByLabelText('이름'), { target: { value: 'test' } });
    fireEvent.change(screen.getByLabelText('이메일'), { target: { value: 'new@email.com' } });
    fireEvent.change(screen.getByLabelText('비밀번호'), { target: { value: 'qwer1234' } });
    fireEvent.change(screen.getByLabelText('비밀번호 확인'), { target: { value: 'qwer1234' } });
    fireEvent.submit(screen.getByRole('button', { name: '회원가입하기' }));

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/dashboard');
    });
  });
});
