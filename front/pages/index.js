import { useSelector } from "react-redux";
import Head from "next/head";
import AppLayout from "@/components/AppLayout";
import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";

const Home = () => {
  const { myInfo } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <>
      <Head>
        <title>Home | NodeBird</title>
      </Head>
      <AppLayout>
        {myInfo && <PostForm />}
        {mainPosts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </AppLayout>
    </>
  );
};

export default Home;
