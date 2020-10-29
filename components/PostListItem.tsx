import React from 'react';
import Link from 'next/link';

import { Post } from './PostListDetail';

type Props = {
  data: Post;
};
const PostListItem = ({ data }: Props) => (
  <Link href="/posts/[id]" as={`/posts/${data.id}`}>
    <a>
      {data.id}: {data.title}
    </a>
  </Link>
);

export default PostListItem;
