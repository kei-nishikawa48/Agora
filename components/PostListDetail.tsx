import * as React from 'react';
import Link from 'next/link';
import { Markdown } from './Markdown';
import { Post } from '../interfaces';

type Props = {
  item: Post;
};
const PostListDetail = ({ item }: Props) => (
  <div>
    <h1>Detail for {item.title}</h1>
    <p>ID: {item.id}</p>
    <Markdown value={item.text} />
    <Link href="/posts/edit" as={`/posts/${item.id}/edit`}>
      <button>編集</button>
    </Link>
    {/* <button>削除</button> */}
  </div>
);

export default PostListDetail;
