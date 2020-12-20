import React from 'react';
import { Markdown } from './Markdown';
import { Post } from '../interfaces';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import { DELETE_ARTICLE } from '../client_hooks/articles';

type Props = {
  item: Post;
};

const PostListDetail = ({ item }: Props) => {
  const tags = item?.tags?.split(',');
  const id = item?.id;
  const [delete_article] = useMutation(DELETE_ARTICLE);
  const deleteArticle = async (deleteid: number) => {
    try {
      await delete_article({
        variables: {
          id: deleteid,
        },
      });
      Router.push(`/users/currentuser`)
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <BackGround>
      <Containar>
        <Inner>
          <HeadItems>
            <div style={{ width: '40%' }}> 作成者 : {item.user?.name}</div>
            <HeadItem>
              <Button
                onClick={() => {
                  Router.push(`/posts/${id}/edit`);
                }}
              >
                編集
              </Button>
              <Button onClick={()=>deleteArticle(id)}>削除</Button>
            </HeadItem>
          </HeadItems>
          <h1>{item.title}</h1>
          {tags?.map((tag) => {
            return (
              <Chip
                size="small"
                label={tag}
                key={tag}
                style={{ marginRight: 3 }}
              />
            );
          })}
          <hr />
          <Markdown value={item.text} />
        </Inner>
      </Containar>
    </BackGround>
  );
};

const Containar = styled.div`
  width: 1000px;
  height: 92vh;
  margin: 0 auto;
  background-color: #fff;
`;

const BackGround = styled.div`
  background-color: #ede7f6;
  font-size: 18px;
`;
const Inner = styled.div`
  width: 94%;
  margin: 0 auto;
  padding-top: 45px;
`;

const HeadItems = styled.div`
  display: flex;
  justify-content: space-between;
  width: 25%;
`;

const HeadItem = styled.div`
  display: flex;
  justify-content: space-center;
  width: 60%;
`;
const Button = styled.button`
  margin-top: 2px;
  margin-left: 22px;
  height: 25px;
  font-size: 14px;
  color: #fff;
  background: #4527a0;
  border-radius: 5px;
`;
export default PostListDetail;
