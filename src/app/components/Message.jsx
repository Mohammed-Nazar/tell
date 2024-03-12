"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


const Message = ({ image, name }) => {
    const token = process.env.NEXT_PUBLIC_TOKEN;
    const sudo = process.env.NEXT_PUBLIC_SUDO;
    const router = useRouter();
  const [message, setMessage] = useState("");
  const [warnAlert, setWarn] = useState(false);
  const [success, setSeccess] = useState(false);


  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  
  let warn = <p className="text-red-900">Please fill the input!</p>;;
  let done = <p className="text-blue-800">Message Sent!</p>

  const handleSubmit = () => {
    if (!message)  {
        setWarn(true);
        setSeccess(false);
    };

    if (message) {
      fetch(
        `https://api.telegram.org/bot${token}/sendMessage?chat_id=${sudo}&text=${message}`
      )
        .then((response) => response.json())
        .then((data) => {
            setWarn(false);
            data.ok? setSeccess(true): setSeccess(false) ;
            setMessage("")

        });
       }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <img
        className="w-[40%] md:w-2/12 rounded-full m-5 shadow-2xl"
        src={image}
        alt="img"
      />
      <h1 className="font-bold mt-2 mb-5 text-xl">{name}</h1>
      <div className="flex flex-col">
        <div
          id="toast-default"
          className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 "
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
          placeholder="Enter your message!"
            onChange={handleMessageChange}
            value={message}
            className="ml-3 text-sm font-normal px-2 py-1 outline-none text-blue-800"
          />
          
        </div>
        {warnAlert && warn}
        {success && done}
        <button
          className="px-4 py-2 bg-blue-800 text-white rounded-md shadow hover:bg-blue-600 transition-colors mt-5 self-end"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
