import * as React from 'react';
import PostListItem from './PostListItem';
import { GET_ARTICLES } from '../client_hooks/articles';
import Button from '@material-ui/core/Button';
import {DELETE_ARTICLE} from "../client_hooks/articles"
import {useMutation,useQuery } from '@apollo/client';


const PostList = () => {
  const [articles,set_articles]=React.useState<any>()
  const { data } = useQuery(GET_ARTICLES,{
    onCompleted:()=>{
      set_articles(data.articles)
    }
  }
  )
  const [delete_article] = useMutation(DELETE_ARTICLE);
  const deletearticle=(deleteid:string)=>{
    delete_article({variables:{
      id:deleteid
    }})
    set_articles(articles.filter((articles:any)=>deleteid !==articles.id))
  }
  return(

    <ul>
    {articles&&articles.map((item:any) => {
      console.log(item)
        return(<li key={item.id}>
        <PostListItem data={item} />
        <Button onClick={()=>
          deletearticle(item.id)
          }>delete</Button>
      </li>
    )})}
  </ul>
  )
};

export default PostList;
