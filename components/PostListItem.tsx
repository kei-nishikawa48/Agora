import React from 'react';
import Link from 'next/link';
import { Post } from '../interfaces';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  article: {
    fontSize: '24px',
    textDecoration: 'none',
  },
}));
type Props = {
  data: Post;
};
const PostListItem = ({ data }: Props) => {
  const classes = useStyles();
  return (
    <Link href={`/posts/${data.id}`}>
      <a className={classes.article}>{data.title}</a>
    </Link>
  );
};
export default PostListItem;
