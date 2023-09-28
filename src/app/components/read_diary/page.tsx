"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Diary_input = () => {
  /* Quill editor csr rendering [start] */
  interface StateSetProps {
    article_pk: number;
    value: string;
  }

  /* Quill editor state */
  const [stateSet, setStateSet] = useState<StateSetProps>({
    article_pk: 0,
    value: "",
  });

  /* Quill editor setState */
  const handleOnChange = (editorContents: string) => {
    setStateSet((restOfData) => ({ ...restOfData, value: editorContents }));
    console.log(stateSet.value);
  };

  /* Get initial data from backend */
  useEffect(() => {
    //fetching data
    fetch("http://localhost:8080/getArticle?diary_pk=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Couldn't retrieve article information from Server"+ response.statusText);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log("returned data: ", data);
        setStateSet(() => ({
          article_pk: data.diary_article_pk,
          value: data.diary_contents,
        }));
      });
  }, []);

  /* etc functions */
  const eventHandler_onclick = (event: any): void => {
    try {
      event.preventDefault();
      console.log("current value", stateSet.value);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex">
        <h1>Diary List</h1>
      </div>
      <br></br>
      <ReactQuill
        value={stateSet.value}
        onChange={handleOnChange}
        theme={"snow"}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "link",
          "image",
          "video",
        ]}
      />
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-4"
          onClick={eventHandler_onclick}
        >
          save
        </button>
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            cancel
          </button>
        </Link>
      </div>
    </>
  );
};

export default Diary_input;

/* <ReactQuill
          value={editorContents}
          onChange={handleOnChange}
          theme={"snow"}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image", "video"],
              ["clean"],
            ],
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "link",
            "image",
            "video",
          ]}
        /> */
