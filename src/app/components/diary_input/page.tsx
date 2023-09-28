"use client";
import Link from "next/link";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Diary_input = () => {
  /* state type declaration */
  interface StateSetProps {
    diaryArticle: string;
    /* user_pk : string; */
  }

  /* Quill editor state */
  const [stateSet, setDiaryArticle] = useState<StateSetProps>({
    diaryArticle: "",
  });

  /* Quill editor setState */
  const handleOnContentChange = (newContent: string) => {
    setDiaryArticle((prevStateData) => ({
      ...prevStateData,
      diaryArticle: newContent,
    }));
    console.log(stateSet);
  };

  const eventHandler_onSave = async (event: any): Promise<void> => {
    event.preventDefault();
    try {
      console.log("saving contents:", stateSet);

      if (
        stateSet.diaryArticle === "" ||
        stateSet.diaryArticle === "<p><br></p>"
      ) {
        
        alert("빈 내용은 입력할 수 없습니다.");

        return;
      } else {
        await fetch("http://localhost:8080/newArticle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(stateSet), // Convert your data to JSON string format
        })
          .then((res) => {
            if (!res.body) {
              throw new Error().message;
            } else {
              const read_res = res.json();
              return read_res;
            }
          })
          .then((data) => {
            console.log("response: ", data);
            console.log("response: ", data.user_pk);
          });
        // Handle the response data here
      }
    } catch (error) {
      // Handle any network errors or exceptions that occur during the fetch process
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex">
        <h1>Your Diary</h1>
      </div>
      <br></br>
      <ReactQuill
        value={stateSet.diaryArticle}
        onChange={handleOnContentChange}
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
          onClick={eventHandler_onSave}
        >
          save
        </button>
        <Link href={"/"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            cancel
          </button>
        </Link>
      </div>
    </>
  );
};

export default Diary_input;
