import Button from '@material-ui/core/Button';
import 'react-mde/lib/styles/css/react-mde-all.css';
import styled from 'styled-components';
import React from "react"
import { MarkdownEditor } from '../components/MarkdownEditor';
import Layout from '../components/Layout';
import {useForm} from "react-hook-form"
import ChipsArray from "../components/Tags"
export default function Form() {
  const [value, set_value] = React.useState(``);
  const {register,handleSubmit,errors}=useForm()
  const submit=()=>{

  }
  return (
    <Layout>
    <form onSubmit={handleSubmit(submit)}>
      <input
      name="title"
      placeholder="タイトル"
      ref={register({required:true})}
      />
      {errors.title&&<p>タイトルを入力してください</p>}
      <Button>タグ追加</Button>
      <ChipsArray/>
    </form>
    <Page>
      <MarkdownEditor  value={value} set_value={set_value} />
    </Page>
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
