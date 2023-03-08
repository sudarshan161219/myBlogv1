import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { Navigate, useParams } from "react-router-dom";

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

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [cover, setCover] = useState("")
  const [redirect, setRedirect] = useState(false);


useEffect(() => {
fetch(`http://localhost:4000/post/${id}`).then(reponse => {
    reponse.json().then(postInfo => {
        const { summary, title, cover, content, createdAt, author , _id} = postInfo;
 setTitle(title)
 setSummary(summary)
 setContent(content)
    })
})
}, [])

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id)
    if(files?.[0]){
         data.set("file", files?.[0]);
    }
   

    setTitle("");
    setSummary("");
    setContent("");
    setFiles("");

    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "PUT",
        body: data,
        credentials: "include",
      });
      if (response.status === 200) {
        toast.success(`success fully edited post`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // setRedirect(true);
      } else {
        toast.error(`Opps!!, something went Wrong`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if(redirect){
    return <Navigate to={'/post'+id} />
  }


  return (
    <main>
      <h1 className="edit-heading">Edit Post</h1>

      <form
        onSubmit={handleUpdateSubmit}
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
        <button className='create-post button-28'>Update post</button>
      </form>
    </main>
  );
};

export default EditPost;
