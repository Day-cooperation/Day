import { Todo } from '@/types/Todo';
const mockTodosData: Todo[] = [
  {
    noteId: 1,
    done: true,
    title: 'Complete TypeScript tutorial',
    id: 101,
    goal: { id: 1, title: 'Learn TypeScript' },
    userId: 1,
    teamId: 'teamA',
    updatedAt: '2024-07-04T05:06:21.673Z',
    createdAt: '2024-07-03T05:06:21.673Z',
  },
  {
    noteId: 2,
    done: false,
    linkUrl: 'https://reactjs.org',
    title: 'Build a React app',
    id: 102,
    goal: { id: 2, title: 'Master React' },
    userId: 2,
    teamId: 'teamB',
    updatedAt: '2024-07-04T06:06:21.673Z',
    createdAt: '2024-07-03T06:06:21.673Z',
  },
  {
    noteId: 3,
    done: false,
    fileUrl: 'https://example.com/design.pdf',
    title: 'Review UI/UX design principles',
    id: 103,
    goal: { id: 3, title: 'Improve Design Skills' },
    userId: 3,
    teamId: 'teamC',
    updatedAt: '2024-07-04T07:06:21.673Z',
    createdAt: '2024-07-03T07:06:21.673Z',
  },
  {
    noteId: 4,
    done: true,
    title: 'Write a blog post on JavaScript',
    id: 104,
    goal: { id: 4, title: 'Blog Writing' },
    userId: 4,
    teamId: 'teamD',
    updatedAt: '2024-07-04T08:06:21.673Z',
    createdAt: '2024-07-03T08:06:21.673Z',
  },
  {
    noteId: 5,
    done: false,
    title: 'Contribute to open source project',
    id: 105,
    goal: undefined,
    userId: 5,
    teamId: 'teamE',
    updatedAt: '2024-07-04T09:06:21.673Z',
    createdAt: '2024-07-03T09:06:21.673Z',
  },
];

export default function Home() {
  return <main className='flex min-h-screen flex-col items-center justify-between p-24'></main>;
}
