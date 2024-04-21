import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 const navigate = useNavigate();

  const onClickHandler = () => {
    axios
      .post("https://paytm-backend-6q0o.onrender.com/api/v1/user/signin", {
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("firstName", res.data.firstName);
        navigate("/dashboard");
        setUsername("");
        setPassword("");
      })
      .catch((e) => {
        console.log(e);
        alert(e.response.data.msg);
      });
  };
  return (
    <div className="bg-white max-w-[350px] flex flex-col gap-1 items-center rounded py-2 px-4">
      <div className="text-3xl pt-5 font-semibold">Signin</div>
      <div className="text-grey">Enter you credentials</div>

      {/*  */}
      <div className=" flex flex-wrap my-2 mt-3 gap-2">
        <label className="flex flex-col gap-1 grow">
          Email{" "}
          <input
            type="email"
            value={username}
            placeholder="johncena@gmail.com"
            className="rounded border px-2 py-1"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label className="flex flex-col  gap-1 grow">
          Password{" "}
          <input
            type="password"
            value={password}
            placeholder="cant see me bruh"
            className="rounded border px-2 py-1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button
        className="bg-sky-500 text-[#ffffff] px-3 py-1 rounded text-base font-medium hover:bg-sky-700 w-full mt-3"
        onClick={onClickHandler}
      >
        Signin
      </button>
      <p className="text-sm py-2">
        New to PayTM?{" "}
        <a href="/signup" className="underline">
          Signup
        </a>
      </p>
    </div>
  );
};

export default Signin;
