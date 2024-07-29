import { rest } from 'msw';
import { mockGoalList, mockNote, mockNoteList, mockProgress, mockTodoList, mockUser } from './mockResponse';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// 요청마다 여기에다 반환할 값들 추가 해줘야 함
export const handlers = [
  rest.post(BASE_URL + '/user', (req, res, ctx) => {
    const { email, name } = req.body;
    if (email === 'test@email.com') {
      return res(ctx.status(409), ctx.json({ message: '이미 사용 중인 이메일입니다.' }));
    } else {
      return res(
        ctx.status(201),
        ctx.json({
          id: 1,
          email,
          name,
          createdAt: '2024-07-29T16:41:46.353Z',
          updatedAt: '2024-07-29T16:41:46.353Z',
        })
      );
    }
  }),

  rest.post(BASE_URL + '/notes', (req, res, ctx) => {
    const { title, content } = req.body;
    if (title && content) {
      return res(ctx.status(201)), ctx.json(jest.fn());
    }
  }),

  rest.patch(BASE_URL + '/notes/:id', (req, res, ctx) => {
    const { title, content } = req.body;
    if (title && content) {
      return res(ctx.status(201)), ctx.json(jest.fn());
    }
  }),

  rest.get(BASE_URL + '/user', (req, res, ctx) => {
    return res(ctx.json(mockUser));
  }),
  rest.get(BASE_URL + '/goals', (req, res, ctx) => {
    return res(ctx.json(mockGoalList));
  }),
  rest.get(BASE_URL + '/goals/:id', (req, res, ctx) => {
    return res(ctx.json(mockGoalList.goals[0]));
  }),
  rest.get(BASE_URL + '/todos', (req, res, ctx) => {
    return res(ctx.json(mockTodoList));
  }),
  rest.get(BASE_URL + '/todos/progress', (req, res, ctx) => {
    return res(ctx.json(mockProgress));
  }),
  rest.get(BASE_URL + '/notes', (req, res, ctx) => {
    return res(ctx.json(mockNoteList));
  }),
  rest.get(BASE_URL + '/notes/:id', (req, res, ctx) => {
    return res(ctx.json(mockNote.find((item) => item.id === Number(req.params.id))));
  }),
];
