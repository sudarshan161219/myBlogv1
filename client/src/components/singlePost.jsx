import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const singlePost = () => {
  const [postInfo, setPostInfo] = useState(null);

  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${params.id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return;

  const { summary, title, cover, content, createdAt, author } = postInfo;


  return (
    <main>

      <div className="img-container">
      <img className="post-img" src={`http://localhost:4000/${cover}`} alt={title} />
      </div>

      <h1 className="post-heading">{title}</h1>
      <div className="content" dangerouslySetInnerHTML={{__html:content}} />
    </main>
  );
};
export default singlePost;
