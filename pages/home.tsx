import * as React from 'react';
import PostList from '../components/PostList';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#EDE7F6',
  },
  articles: {
    width: '1000px',
    margin: 'auto',
  },
}));
export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.articles}>
        <PostList />
      </div>
    </div>
  );
}
