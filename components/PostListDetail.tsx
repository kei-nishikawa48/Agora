import React from 'react';
import { Markdown } from './Markdown';
import { Post } from '../interfaces';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';

type Props = {
  item: Post;
};
const PostListDetail = ({ item }: Props) => {
  const tags = item?.tags?.split(',');
  return (
    <BackGround>
      <Containar>
        <Inner>
          <div> 作成者:{item.user?.name}</div>
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

export default PostListDetail;
