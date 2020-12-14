import * as React from 'react';
import PostListItem from './PostListItem';
import { GET_ARTICLES } from '../client_hooks/articles';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import { DELETE_ARTICLE } from '../client_hooks/articles';

const useStyles = makeStyles(() => ({
  list: {
    width: '100',
    height: '70px',
    padding: '17px',
    backgroundColor: 'white',
    listStyle: 'none',
  },
}));
type Article = {
  id: number;
  title: string;
  text: string;
  tags:string
};
type Articles = Article[] | undefined;

const PostList = () => {
  const classes = useStyles();
  const [articles, set_articles] = React.useState<Articles>();
  const { data } = useQuery(GET_ARTICLES, {
    onCompleted: () => {
      set_articles(data.articles);
    },
  });
 
  return (
    <>
      {articles &&
        articles.map((item: Article) => (
          <li className={classes.list} key={item.id}>
            <PostListItem data={item} />
            {/* <Button onClick={() => deletearticle(item.id)}>delete</Button> */}
          </li>
        ))}
    </>
  );
};

export default PostList;
