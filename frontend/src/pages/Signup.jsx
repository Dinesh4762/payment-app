import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onclickHandle = () => {
    axios
      .post("http://localhost:3000/api/v1/user/signup", {
        username,
        password,
        firstName,
        lastName,
      })
      .then((response) => {
        setfirstName("");
        setlastName("");
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("firstName",response.data.firstName)
          console.log("user created")
          navigate("/dashboard")
        }
      })
      .catch((e) => console.log(e));
    
  };
  return (
    <div className="bg-white max-w-[350px] flex flex-col gap-1 items-center rounded py-2 px-4">
      <div className="text-3xl pt-5 font-semibold">SignUp</div>
      <p className="text-grey">Create an account first!</p>

      {/*  */}
      <div className="flex flex-wrap gap-2 w-full justify-between my-2 mt-3">
        <label className="flex flex-col grow max-w-[150px]">
          First Name
          <input
            type="text"
            value={firstName}
            className="border px-2 py-1 rounded"
            placeholder="John"
            onChange={(e) => setfirstName(e.target.value)}
          />
        </label>
        <label className="flex flex-col grow max-w-[150px]">
          Last Name
          <input
            type="text"
            value={lastName}
            className=" border px-2 py-1 rounded"
            placeholder="Cena"
            onChange={(e) => setlastName(e.target.value)}
          />
        </label>
        <label className="flex flex-col grow ">
          Email
          <input
            type="email"
            value={username}
            className="border px-2 py-1 rounded"
            placeholder="johncena@gmail.com"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="flex flex-col grow ">
          Password
          <input
          value={password}
            type="password"
            className="border px-2 py-1 rounded"
            placeholder="you cant see me"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button
        type="submit"
        className=" bg-sky-500 text-[#ffffff] px-3 py-1 rounded text-base font-medium hover:bg-sky-700 w-full mt-3"
        onClick={onclickHandle}
      >
        SignUp
      </button>
      <p className="text-sm py-2">
        Already have an account?
        <a href="/signin" className="underline">
          Signin
        </a>
      </p>
    </div>
  );
};

export default Signup;
