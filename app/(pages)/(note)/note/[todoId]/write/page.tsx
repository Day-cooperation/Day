'use client';

import { useParams } from 'next/navigation';

export default function NoteWrite() {
  const query = useParams();
  console.log(query);
  return <h1>note</h1>;
}
