import Link from "next/link"
import Layout from '../components/Layout';
import firebase from "../utils/Firebase"
// import {get_users} from "../client_hooks/users"
// import {get_articles} from "../client_hooks/articles"
// import {get_comments} from "../client_hooks/comment"


const IndexPage = () => {
  // const comments = get_comments()
  // const articles = get_articles() 
  // const users=get_users()
  const logout=async()=>{
    await firebase.auth().signOut()
  }
  // console.log(users)
  // console.log(articles)
  // console.log(comments)
  return (
 
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
      <Link href="/about">
        <a>About</a>
      </Link>
      <button onClick={logout} >logout</button>
  </Layout>
  );
};

export default IndexPage;
