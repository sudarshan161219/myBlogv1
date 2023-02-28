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
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  // class MyComponent extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       text: "",
  //     }
  //   }


  // }

  return (
    <main>
      <form className='creatNewPost'>
        <input type='text' placeholder='title' value={title} />
        <input type='summary' placeholder='summary' value={summary}/>
        <input type='file' />
        <ReactQuill
          className='quill'
          theme='snow'
          value={content}
          modules={modules}
          formats={formats}
        />
        <button className='create-post button-28'>Create post</button>
      </form>
    </main>
  );
};

export default CreatNewPost;
