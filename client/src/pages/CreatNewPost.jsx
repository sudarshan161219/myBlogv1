import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

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
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    Content: "",
    // image: "",
  });
  const [files, setFiles] = useState("");

  const { title, summary, Content } = formData;
  const person = new Object(formData);
  person.image = files[0]


  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormData({
      title: "",
      summary: "",
      Content: "",
    });

    console.log(person);


    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        body: JSON.stringify(person),
      });
      response.json();

      if (response.status === 200) {
        toast.success(`status 200`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(`Opps!!,`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onMutate = (e) => {
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }

    // if (e.target.files) {
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     image: e.target.files,
    //   }));
    // }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      Content: e,
    }));
  };

  const handleimg = (e) => {
    setFiles(e.target.files);
  };

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        className='creatNewPost'
        // encType='multipart/form-data'
        // enctype="multipart/form-data"
        // en
      >
        <input
          type='text'
          placeholder='title'
          id='title'
          value={title}
          onChange={onMutate}
        />

        <input
          type='summary'
          placeholder='summary'
          id='summary'
          value={summary}
          onChange={onMutate}
        />

        <input
          type='file'
          // id='image'
          name='image'
          onChange={handleimg}
          accept='.jpg,.png,.jpeg'
        />

        <ReactQuill
          type='text'
          className='quill'
          theme='snow'
          id='content'
          value={Content}
          modules={modules}
          formats={formats}
          onChange={handleChange}
        />
        <button className='create-post button-28'>Create post</button>
      </form>
    </main>
  );
};

export default CreatNewPost;
