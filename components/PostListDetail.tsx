import * as React from 'react';
import Link from 'next/link';
import {Markdown} from "./Markdown"
const PostListDetail = ({ item: post }: any) => (
  <div>
    <h1>Detail for {post.title}</h1>
    <p>ID: {post.id}</p>
    <Markdown value={post.text} />
    <Link href="/posts/edit" as={`/posts/${post.id}/edit`}>
      <button>編集</button>
    </Link>
    {/* <button>削除</button> */}
  </div>
);

export default PostListDetail;
