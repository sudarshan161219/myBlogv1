import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContex";
import {FiEdit} from 'react-icons/fi'

const singlePost = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);

  const params = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${params.id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return;

  const { summary, title, cover, content, createdAt, author , _id} = postInfo;

  console.log(userInfo.id === author._id);

  return (
    <main>
      <div className='img-container'>
        <img
          className='post-img'
          src={`http://localhost:4000/${cover}`}
          alt={title}
        />
      </div>
{userInfo.id === author._id && (
  <div className="edit-container">
    <Link to={`/edit/${_id}`} className="edit-btn button-17"> Edit this post <FiEdit /></Link>
  </div>
)}
      <div>
        <h1 className='post-heading'>{title}</h1>
        <div
          className='content'
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </main>
  );
};
export default singlePost;
