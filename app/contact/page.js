"use client";
import React, { useState } from "react";

const Contact = () => {
  const [inputs, setInputs] = useState({});
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    setInputs((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(process.env.NEXT_PUBLIC_API_URL + "/contact", {
      method: "POST",
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
        setInputs({});
      });
  };
  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="flex items-center mb-4">
            <label for="name" className="w-1/4">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="border rounded px-2 py-1 w-3/4"
              onChange={handleInput}
              value={inputs.name ?? ""}
              name="name"
            />
          </div>
          <div className="flex items-center mb-4">
            <label for="email" className="w-1/4">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="border rounded px-2 py-1 w-3/4"
              onChange={handleInput}
              value={inputs.email ?? ""}
              name="email"
            />
          </div>
          <div className="flex items-center mb-4">
            <label for="message" className="w-1/4">
              Message:
            </label>
            <textarea
              id="message"
              className="border rounded px-2 py-1 w-3/4"
              rows="4"
              onChange={handleInput}
              value={inputs.message ?? ""}
              name="message"
            ></textarea>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
        {message && <p>{message}</p>}
      </main>
    </>
  );
};

export default Contact;
