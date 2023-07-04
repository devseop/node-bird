import { useSelector } from "react-redux";
import Head from "next/head";
import AppLayout from "@/components/AppLayout";
import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const mainPosts = useSelector((state) => state.post.mainPosts);

  return (
    <>
      <Head>
        <title>Home | NodeBird</title>
      </Head>
      <AppLayout>
        {isLoggedIn && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};

export default Home;
