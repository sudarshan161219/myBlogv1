import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

  // const [title, setTitle] = useState("");
  // const [summary, setSummary] = useState("");
  // const [content, setContent] = useState("");
  // const [files, setFiles] = useState('');

 const [formData, setFormData] = useState({
title:'',
summary:'',
Content: '',
images:{}
})

const {title, summary, Content,  images} = formData


  const handleSubmit =  (e) => {
   e.preventDefault();
   console.log(formData);
    // const data = new newFormData();
    // data.set("title", title);
    // data.set("summary", summary);
    // data.set("content", content);
    // data.set("file", files[0]);


    // setTitle("");
    // setSummary("");
    // setContent("");
    // setFiles("")

    // try {
    //   const response = await fetch("http://localhost:4000/post", {
    //     method: "POST",
    //     body:data,
    //     headers: { "content-Type": "application/json" },
    //   });

    //   if (response.status === 200) {
    //     toast.success(`Opps!!, username: ${username} already taken`, {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //   } else {
    //     toast.error(`Opps!!, username: ${username} already taken`, {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }


  };


  const onMutate = (e) => {

      if(!e.target.files){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]:   e.target.value,
    }))
  }


  if(e.target.files){
    setFormData((prevState) => ({
      ...prevState,
      images: e.target.files
    }))
  }
    
  };

const handleChange = (e) => {
  setFormData((prevState) => ({
    ...prevState,
    Content: e
  }))
}
 
  return (
    <main>
      <form onSubmit={handleSubmit} className='creatNewPost' encType="multipart/form-data">

        <input
          type='text'
          placeholder='title'
          id="title"
          value={title}
          onChange={onMutate}
        />

        <input
          type='summary'
          placeholder='summary'
          id="summary"
          value={summary}
          onChange={onMutate}
        />

        <input 
        type='file'
        id="images"
        onChange={onMutate} 
        accept='.jpg,.png,.jpeg' 
        />

        <ReactQuill
        type='text'
          className='quill'
          theme='snow'
          id="content"
          value={Content}
          modules={modules}
          formats={formats}
          onChange={handleChange }
        />
        <button className='create-post button-28'>Create post</button>
      </form>
    </main>
  );
};

export default CreatNewPost;
