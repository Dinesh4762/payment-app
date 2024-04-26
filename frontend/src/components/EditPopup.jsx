import React, { useEffect, useState } from "react";
import Input from "./Input";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const EditPopup = ({ setEditPopup }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const onClickHandler = () => {
    if (password || firstName || lastName) {
      const changedInputs = {};
      if (password) {
        changedInputs.password = password;
      }
      if (firstName) {
        changedInputs.firstName = firstName;
      }
      if (lastName) {
        changedInputs.lastName = lastName;
      }
      console.log(changedInputs);
      axios
        .put(
          "https://paytm-backend-6q0o.onrender.com/api/v1/user",
          changedInputs,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(({ data }) => {
          toast.success("profile updated successfully");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch((e) => {
          toast.error(e.response.data.msg);
        });
    } else {
      toast.error("inputs are required");
    }
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-zinc-100 backdrop-filter backdrop-blur-sm bg-opacity-90 px-3 py-5 w-[350px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md rounded-md flex flex-col gap-3"
    >
      <p className="font-semibold text-2xl text-center border-b pb-2">
        Edit Profile
      </p>
      <Input label={"Password"} value={password} onChange={setPassword} />
      <Input label={"First Name"} value={firstName} onChange={setfirstName} />
      <Input label={"Last Name"} value={lastName} onChange={setlastName} />

      <div className="flex gap-4 mx-auto mt-3">
        <button
          className="bg-white text-black scale-100 active:scale-90 transition-all duration-300 ease-out rounded w-[100px] self-center hover:bg-grey/10 border"
          onClick={() => setEditPopup(false)}
        >
          Cancel
        </button>
        <button
          className="bg-black text-white scale-100 active:scale-90 transition-all duration-300 ease-out rounded w-[100px] self-center"
          onClick={onClickHandler}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditPopup;
