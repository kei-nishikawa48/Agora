import Button from '@material-ui/core/Button';
import 'react-mde/lib/styles/css/react-mde-all.css';
import styled from 'styled-components';
import React from 'react';
import { MarkdownEditor } from '../components/MarkdownEditor';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import ChipsArray from '../components/Tags';
import { CREATE_ARTICLE } from '../client_hooks/articles';
import { useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';
import Router from 'next/router';

type Detail = { title: string; tags: string; text: string };
export default function Form() {
  const [cookies] = useCookies(['token']);

  React.useEffect(() => {
    !Object.keys(cookies).length && Router.push('/signin');
  }, [cookies]);

  const [value, set_value] = React.useState(``);
  const { register, handleSubmit, errors } = useForm();
  const [create_article] = useMutation(CREATE_ARTICLE);
  const submit = async (detail: Detail) => {
    await create_article({
      variables: {
        title: detail.title,
        tags: detail.title,
        text: value,
      },
    });
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit(submit)}>
        <input
          name="title"
          placeholder="タイトル"
          ref={register({ required: true })}
        />
        {errors.title && <p>タイトルを入力してください</p>}
        {/* <Button>タグ追加</Button> */}
        <ChipsArray />
        <Page>
          <MarkdownEditor value={value} set_value={set_value} />
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
