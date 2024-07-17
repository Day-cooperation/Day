import { rest } from 'msw';
import { env } from 'process';

const BASE_URL = env.NEXT_PUBLIC_BASE_URL;
// 요청마다 여기에다 반환할 값들 추가 해줘야 함
export const handlers = [
  rest.post(BASE_URL + '/auth/login', (req, res, ctx) => {
    const { email, password } = req.body;
    if (email !== 'test@email.com') {
      return res(
        ctx.status(404), // 상태 코드
        ctx.json({ message: '가입되지 않은 이메일입니다.' }) // 응답 데이터
      );
    } else if (email === 'test@email.com' && password === 'test1234') {
      return res(
        ctx.status(201), // 상태 코드
        ctx.json({ ...mock, user: { email, name: 'test' } }) // 응답 데이터
      );
    } else if (email === 'test@email.com' && password !== 'test1234') {
      return res(ctx.status(400), ctx.json({ message: '비밀번호가 올바르지 않습니다.' }));
    }
  }),

  rest.post(BASE_URL + '/user', (req, res, ctx) => {
    const { email, name } = req.body;
    if (email === 'test@email.com') {
      console.log('vvv');
      return res(ctx.status(409), ctx.json({ message: '이미 사용 중인 이메일입니다.' }));
    } else {
      return res(ctx.status(201), ctx.json({ ...mock, user: { email, name } }));
    }
  }),
];

const mock = {
  data: {
    accessToken: 'accesstoken',
    refreshToken: 'refreshtoken',
    user: {
      id: 7,
      email: 'test@email.com',
      name: 'test',
      createdAt: '2024-07-08T14:21:16.862Z',
      updatedAt: '2024-07-08T14:21:16.862Z',
    },
  },
};
