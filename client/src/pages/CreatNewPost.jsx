import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import {Navigate} from 'react-router-dom'


const modules = {
  toolbar: [
    [{ header: [1, 2, 3] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatNewPost = () => {
  // const [formData, setFormData] = useState({
  //   title: "",
  //   summary: "",
  //   Content: "",
  //   // image: "",
  // });
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    setTitle("");
    setSummary("");
    setContent("");
    setFiles("");


    try {
     const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: 'include'
    });
    if(response.status === 200){
      toast.success(`success fully created new post`, {
        position: toast.POSITION.TOP_RIGHT
    });
      setRedirect(true)
    }else{
      toast.error(`Opps!!, something went Wrong`, {
        position: toast.POSITION.TOP_RIGHT
    });
    }
    } catch (error) {
      console.log(error);
    }

  };

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        className='creatNewPost'
        encType='multipart/form-data'
      >
        <input
          type='text'
          placeholder='title'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type='summary'
          placeholder='summary'
          id='summary'
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <input
          type='file'
          // id='image'
          name='file'
          onChange={(e) => setFiles(e.target.files)}
          accept='.jpg,.png,.jpeg'
        />

        <ReactQuill
          type='text'
          className='quill'
          theme='snow'
          id='content'
          value={content}
          modules={modules}
          formats={formats}
          onChange={(e) => setContent(e)}
        />
        <button className='create-post button-28'>Create post</button>
      </form>
    </main>
  );
};

export default CreatNewPost;
