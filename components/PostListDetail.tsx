import * as React from 'react';

import { Post } from '../interfaces';

type PostListDetailProps = {
  item: Post;
};

const PostListDetail = ({ item: post }: PostListDetailProps) => (
  <div>
    <h1>Detail for {post.title}</h1>
    <p>ID: {post.id}</p>
    <p>Description: {post.text}</p>
  </div>
);

export default PostListDetail;
