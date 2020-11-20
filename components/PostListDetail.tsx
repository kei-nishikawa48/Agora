import * as React from 'react';
import Link from 'next/link';
import { Markdown } from './Markdown';
import { Post } from '../interfaces';

type Props = {
  data: Post;
};
const PostListDetail = ({ data }: Props) => (
  <div>
    <h1>Detail for {data.title}</h1>
    <p>ID: {data.id}</p>
    <Markdown value={data.text} />
    <Link href="/posts/edit" as={`/posts/${data.id}/edit`}>
      <button>編集</button>
    </Link>
    {/* <button>削除</button> */}
  </div>
);

export default PostListDetail;
