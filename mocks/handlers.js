import { rest } from 'msw';
import { env } from 'process';

// 요청마다 여기에다 반환할 값들 추가 해줘야 함
export const handlers = [
  rest.post(env.NEXT_PUBLIC_BASE_URL + '/auth/login', (req, res, ctx) => {
    const { email, password } = req.body;

    if (email !== 'test@email.com') {
      return res(
        ctx.status(401), // 상태 코드
        ctx.json({ message: '가입되지 않은 이메일입니다.' }) // 응답 데이터
      );
    } else email === 'test@email.com' && password === 'test1234';

    return res(
      ctx.status(201), // 상태 코드
      ctx.json(mock) // 응답 데이터
    );
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
