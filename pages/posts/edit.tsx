import Button from '@material-ui/core/Button';
import 'react-mde/lib/styles/css/react-mde-all.css';
import styled from 'styled-components';
import React from 'react';
import { MarkdownEditor } from '../../components/MarkdownEditor';
import Layout from '../../components/Layout';
import { useForm } from 'react-hook-form';
import ChipsArray from '../../components/Tags';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ARTICLE, UPDATE_ARTICLE } from '../../client_hooks/articles';
import { useRouter } from 'next/router';

export default function Form() {
  const [value, set_value] = React.useState('');
  const router = useRouter();
  const pathname = router.asPath;
  const end = pathname.indexOf('/edit');
  const articleid = pathname.slice(7, end);
  const { data } = useQuery(GET_ARTICLE, {
    variables: { id: articleid },
    onCompleted:()=>{
      set_value(data.article.text);
    }
  });

  const { register, handleSubmit, errors } = useForm();
  const [update_article, data1={ data }] = useMutation(UPDATE_ARTICLE);
  const submit = (articledata: any) => {
    update_article({
      variables: {
        id: articleid,
        title: articledata.title,
        text: value,
        tags: 'test',
      },
    });
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit(submit)}>
        {data && (
          <input
            name="title"
            placeholder="タイトル"
            value={data && data.article.title}
            ref={register({ required: true })}
          />
        )}
        {errors.title && <p>タイトルを入力してください</p>}
        <Button>タグ追加</Button>
        <ChipsArray />
      <Page>
        {data && <MarkdownEditor value={value} set_value={set_value} />}
      </Page>
      <Button type="submit">追加</Button>
      </form>
    </Layout>
  );
}
const Page = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Container = styled.div`
  width: 100%;
`;
