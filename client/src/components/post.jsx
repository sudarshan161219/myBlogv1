import React from "react";
import {Link} from 'react-router-dom'
import {format} from  'date-fns'


const post = ({ post }) => {
  const {_id , summary, title, cover, content , createdAt, author} = post;

  return (
    <>
      <div className='post'>
        <Link className='image' to={`/post/${_id}`}>
          <img
            src={`http://localhost:4000/${cover}`}
            alt='img'
          />
        </Link>

        <div className='texts'>
          <div>{title}</div>
          <p className='info'>
            <a href='' className='author'>
              {author.username}
            </a>
            <time>{ format(new Date ( createdAt), 'MMM d, Y HH:mm')}</time>
          </p>
<p>{ summary}</p>
          <p>
            {content}
          </p>
        </div>
      </div>
    </>
  );
};

export default post;
