import React, { useState } from 'react';
import Header from '../../../components/Header';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import PostListItem from '../../../components/PostListItem';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../../../client_hooks/users';

type Article = {
  title: string;
  id: number;
  text: string;
  tags: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#EDE7F6',
  },
  list: {
    width: '100',
    height: '70px',
    padding: '17px',
    backgroundColor: 'white',
    listStyle: 'none',
  },
  main: {
    width: '1000px',
    marginTop: '55px',
    margin: 'auto',
  },
  profile: {
    width: '100%',
    height: '150px',
    paddingLeft: '60px',
    paddingRight: '80px',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    display: 'flex',
  },
  userData: {
    display: 'flex',
  },
  userIcon: {
    width: '80px',
    height: '80px',
    backgroundColor: '#4527A0',
  },
  icon: {
    color: 'white',
    '&.MuiSvgIcon-root ': {
      fontSize: '57px',
    },
  },
  userArticle: {
    marginLeft: '48px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleCount: {
    margin: '0',
  },
  articleCountText: {
    margin: '0',
  },
  profileEdit: {},
  button: {
    color: 'white',
    backgroundColor: '#4527A0',
  },
  articlesContainer: {
    width: '100%',
    height: '545px',
    marginTop: '50px',
    padding: '50px',
    backgroundColor: 'white',
  },
  articlesTitle: {
    margin: '0',
    paddingBottom: '4px',
    borderBottom: 'solid 1px black',
  },
  articles: {
    overflow: 'scroll',
    height: '100%',
  },
}));
export default function UserIndex() {
  const classes = useStyles();
  const [currentUserArticles, set_currentUserArticles] = useState<Article[]>(
    []
  );
  const { data } = useQuery(GET_CURRENT_USER, {
    onCompleted: () => {
      set_currentUserArticles(data.current_user.articles);
      // console.log(currentUserArticles[0].title);
    },
  });

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.main}>
        <div className={classes.profile}>
          <div className={classes.userData}>
            <div className={classes.userIcon}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle className={classes.icon} />
              </IconButton>
            </div>
            <div className={classes.userArticle}>
              <p className={classes.articleCount}>
                {currentUserArticles.length}
              </p>
              <p className={classes.articleCountText}>投稿</p>
            </div>
          </div>
          <div className={classes.profileEdit}>
            <button className={classes.button}>プロフィールを編集する</button>
          </div>
        </div>
        <div className={classes.articlesContainer}>
          <p className={classes.articlesTitle}>投稿した記事</p>
          <div className={classes.articles}>
            {currentUserArticles &&
              currentUserArticles.map((article: Article) => (
                <li className={classes.list} key={article.id}>
                  <PostListItem data={article} />
                </li>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
