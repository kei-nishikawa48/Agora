import * as React from 'react';
import PostListItem from './PostListItem';
import { GET_ARTICLES } from '../client_hooks/articles';
import Button from '@material-ui/core/Button';
import { DELETE_ARTICLE } from '../client_hooks/articles';
import { useMutation, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';

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
  const [delete_article] = useMutation(DELETE_ARTICLE);
  const deletearticle = async (deleteid: number) => {
    try {
      await delete_article({
        variables: {
          id: deleteid,
        },
      });
      set_articles(
        articles?.filter((article: Article) => deleteid !== article.id)
      );
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <>
      {articles &&
        articles.map((item: Article) => (
          <li className={classes.list} key={item.id}>
            <PostListItem data={item} />
            <Button onClick={() => deletearticle(item.id)}>delete</Button>
          </li>
        ))}
    </>
  );
};

export default PostList;
