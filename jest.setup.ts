import '@testing-library/react';
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// 목 서버 실행
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
