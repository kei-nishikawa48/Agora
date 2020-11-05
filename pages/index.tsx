import Link from "next/link"
import Layout from '../components/Layout';
import firebase from "../utils/Firebase"


const IndexPage = () => {

  const logout=async()=>{
    await firebase.auth().signOut()
  }
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
