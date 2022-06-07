import React, { useState, useEffect } from "react";
import Post from "./Post/Post";
import "./Posts";
import axios from "axios";

// Affichage des différents posts

const ShowPosts = () => {
  const [postsData, UpPostsData] = useState([]);
  const [showData, uPshowData] = useState(true);

  // useEffect ac tableau vide ??
  useEffect(() => {
    const getPosts = async () => {
      const token = JSON.parse(localStorage.getItem("user")).token;
      await axios
        .get("http://localhost:3001/api/post", {
          withCredentials: true,
          headers: { authorization: `Bearer ${token}` },
        })

        .then((response) => {
          if (response.status === 200) {
            UpPostsData(response.data);
          } else {
            uPshowData(false);
          }
        });
    };
    getPosts();
  }, []);

  return (
    <div className="posts">
      {showData
        ? postsData.map((post) => {
            return <Post post={post} key={post.id} />;
          })
        : `Affichage impossible`}
    </div>
  );
};

export default ShowPosts;