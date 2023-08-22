"use client";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

const SignIn = () => {
  /* state type declaration */
  interface FormDataProps {
    userEmail: string;
    userPassword: string;
    userPhoneNumber: string;
    userName: string;
  }
  /* state 모음 */
  const [formData, setFormData] = useState<FormDataProps>({
    userEmail: "",
    userPassword: "",
    userPhoneNumber: "",
    userName : ""
  });

  /* useEffect */

  /* input validation for phone numbers */
  const handleInputChange_phone = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    console.log("name and value : {},{} ", name, value);

    // Remove any non-digit characters from the input value
    const sanitizedValue = value.replace(/\D/g, "");
    console.log("sanitizedValue : ", sanitizedValue);

    // Update state
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: sanitizedValue,
    }));

    // Update input box
    event.target.value = sanitizedValue;
  };

  /* formData Handling */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // made name identical with state and tags
    console.log(name, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  /* 회원 등록 */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Registration logic
    try {
      console.log("sending data:", JSON.stringify(formData));

      if (formData.userEmail === "") {
        alert("이메일이 공백이거나 올바르지 않은 형식입니다.");
        return;
      } else if (formData.userPassword === "") {
        alert("비밀번호는 필수 입니다.");
        return;
      } else if (formData.userPhoneNumber === "") {
        alert("전화번호는 꼭 입력해주세요.");
        return;
      } else {
        await fetch("http://localhost:8080/newUserAccount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the appropriate content type for your data
            // Add other headers as needed
          },
          body: JSON.stringify(formData), // Convert your data to JSON string format
        })
          .then((res) => {
            if (!res.body) {
              throw new Error(
                "failed to retrive Data from server check status."
              );
            } else {
              console.log("res : ", res, typeof res);
            }
            return res.json();
          })
          .then((data) => {
            console.log(data);
            // do something you want after this.
          });
        // Handle the response data here
      }
    } catch (error) {
      // Handle any network errors or exceptions that occur during the fetch process
      console.error("Error posting data:", error);
    }
  };

  /* 홈으로 */

  return (
    <div className="justify-center flex flex-cols">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-center font-bold mb-8">Register</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email (ID) :
          </label>
          <input
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="userEmail"
            type="email"
            value={formData.userEmail}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="userName"
          >
            Name :
          </label>
          <input
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userName"
            name="userName"
            type="text"
            value={formData.userName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password :
          </label>
          <input
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="userPassword"
            type="password"
            value={formData.userPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="userPhoneNumber"
          >
            Phone Number :
          </label>
          <input
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="userPhoneNumber"
            name="userPhoneNumber"
            type="tel"
            value={formData.userPhoneNumber}
            onChange={handleInputChange_phone}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
        <Link href={"/"}>
          <button className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Home
          </button>
        </Link>
      </form>
    </div>
  );
};
export default SignIn;
