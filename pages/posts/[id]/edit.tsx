import Button from '@material-ui/core/Button';
import 'react-mde/lib/styles/css/react-mde-all.css';
import styled from 'styled-components';
import React from 'react';
import { MarkdownEditor } from '../../../components/MarkdownEditor';
import Layout from '../../../components/Layout';
import { useForm } from 'react-hook-form';
import ChipsArray from '../../../components/Tags';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ARTICLE, UPDATE_ARTICLE } from '../../../client_hooks/articles';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

export default function Form() {
  const [tagName, set_tagName] = React.useState<string[]>([]);

  const handle_change = (event: React.ChangeEvent<{ value: unknown }>) => {
    set_tagName(event.target.value as string[]);
  };
  const [cookies] = useCookies(['token']);
  const router = useRouter();
  React.useEffect(() => {
    !Object.keys(cookies).length && router.push('/signin');
  }, [cookies]);
  const [value, set_value] = React.useState('');
  const pathname = router.asPath;
  const end = pathname.indexOf('/edit');
  const articleid = pathname.slice(7, end);
  const { data } = useQuery(GET_ARTICLE, {
    variables: { id: articleid },
    onCompleted: () => {
      set_value(data.article.text);
    },
  });

  const { register, handleSubmit } = useForm();
  const [update_article] = useMutation(UPDATE_ARTICLE);
  const submit = (articledata: { title: string }) => {
    if (!articledata.title) {
      const title = data.article.title;
      update_article({
        variables: {
          id: articleid,
          title: title,
          text: value,
          tags: 'test',
        },
      });
    } else {
      const title = articledata.title;
      update_article({
        variables: {
          id: articleid,
          title: title,
          text: value,
          tags: 'test',
        },
      });
    }
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit(submit)}>
        {data && (
          <input
            name="title"
            placeholder={data && data.article.title}
            ref={register}
          />
        )}
        <Button>タグ追加</Button>
        <ChipsArray tagName={tagName} handle_change={handle_change}/>
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
