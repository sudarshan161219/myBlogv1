import React from "react";
import {format} from  'date-fns'


const post = ({ post }) => {
  const { summary, title, cover, content , createdAt, author} = post;

  return (
    <>
      <div className='post'>
        <div className='image'>
          <img
            src={`../../../api/${cover}`}
            alt='img'
          />
        </div>

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
