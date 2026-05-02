import React from "react";
import { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/Post";
import {usePost} from "../hook/usePost"
const Feed = () => {
  const { handelFeed, feed, loading, } = usePost();
 useEffect(() => {
  const fetchData = async () => {
    await handelFeed();
  };

  fetchData();
}, []);
  
  return (
    <main className="feed-page">
      <div className="feed">
        <div className="posts">
          {
            feed?.map(post=>{
              return <Post key={post._id} post={post} />
            })
          }
        </div>
      </div>
    </main>
  );
};

export default Feed;
