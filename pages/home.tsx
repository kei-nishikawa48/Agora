import * as React from 'react';
import PostList from '../components/PostList';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '92vh',
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
    <Layout>
      <div className={classes.root}>
        <div className={classes.articles}>
          <PostList />
        </div>
      </div>
    </Layout>
  );
}
