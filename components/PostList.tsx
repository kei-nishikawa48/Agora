import * as React from 'react';
import PostListItem from './PostListItem';
import {get_articles} from "../client_hooks/articles"


const PostList = () => {
  const articles =get_articles().articles
  return(

    <ul>
    {articles&&articles.map((item:any) => (
      <li key={item.id}>
        <PostListItem data={item} />
      </li>
    ))}
  </ul>
  )
};

export default PostList;
