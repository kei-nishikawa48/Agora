import * as React from 'react';
import PostListItem from './PostListItem';
import { GET_ARTICLES } from '../client_hooks/articles';
import Button from '@material-ui/core/Button';
import {DELETE_ARTICLE} from "../client_hooks/articles"
import {useMutation,useQuery } from '@apollo/client';
type article ={
      id: number;
      title: string;
      text: string;
}

  type articles=  article[] 



const PostList = () => {
  const [articles,set_articles]=React.useState<articles>()
  const { data } = useQuery(GET_ARTICLES,{
    onCompleted:()=>{
      set_articles(data.articles)
    }
  }
  )
  const [delete_article] = useMutation(DELETE_ARTICLE);
  const deletearticle=(deleteid:number)=>{
    delete_article({variables:{
      id:deleteid
    }})
    set_articles(articles?.filter((article:article)=>deleteid !==article.id))
  }
  return(

    <ul>
    {articles&&articles.map((item:any) => {
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
