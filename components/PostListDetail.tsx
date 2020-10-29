import * as React from 'react';
import Link from 'next/link';
import { Post } from '../interfaces';

type PostListDetailProps = {
  item: Post;
};

const PostListDetail = ({ item: post }: PostListDetailProps) => (
  <div>
    <h1>Detail for {post.title}</h1>
    <p>ID: {post.id}</p>
    <p>Description: {post.text}</p>
    <Link href="/posts/edit" as={`/posts/${post.id}/edit`}>
      <button>編集</button>
    </Link>
    {/* <button>削除</button> */}
  </div>
);

export default PostListDetail;
