import { User, Post } from '../interfaces';

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: 101, name: 'Alice' },
  { id: 102, name: 'Bob' },
  { id: 103, name: 'Caroline' },
  { id: 104, name: 'Dave' },
];

export const samplePostData: Post[] = [
  { id: 101, title: 'Todo-app作ってみた', text: 'サンプルテキスト' },
  { id: 102, title: 'Chat-app作ってみた', text: 'サンプルテキスト' },
  { id: 103, title: 'githubの練習', text: 'サンプルテキスト' },
  { id: 104, title: 'AWS勉強', text: 'サンプルテキスト' },
];
