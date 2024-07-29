import '@testing-library/react';
import '@testing-library/jest-dom';
import { server } from './mocks/server';
import { getSession } from 'next-auth/react';

// 목 서버 실행
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

global.TextEncoder = require('text-encoding').TextEncoder;
global.TextDecoder = require('text-encoding').TextDecoder;

jest.mock('next-auth/react');

const mockSession = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: {},
};

(getSession as jest.Mock).mockReturnValueOnce([mockSession, 'authenticated']);
