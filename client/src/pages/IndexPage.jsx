import React, { useEffect, useState } from "react";
import Post from "../components/post";

const IndexPage = () => {
const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchData();
  }, []);

function fetchData() {
      try {
        fetch("http://localhost:4000/post").then(response => {
          response.json().then(posts => {
            setPosts(posts);
          })
        })
      } catch (error) {
        console.log(error);
      }
    }

 
    // const response = await  fetch( `https://api.weatherapi.com/v1/forecast.json?key=d6f8c23cf7664a70b8b154605221012&q=${query}&days=5&aqi=yes&alerts=yes`)

    // const info = await response.json()

  return (
    <>
    {posts.map( (post, idx) => (
      <Post key={idx} post={post} />
    ))}  
    </>
  );
};

export default IndexPage;
