import React from "react";
import { useNavigate } from "react-router-dom";

const User = ({user}) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 items-center px-1 py-2">
      <span className="w-8 h-8 rounded-full bg-green-500 grid place-content-center font-medium text-white">
        {user.firstName[0].toUpperCase()}
      </span>
      <div>
        {user.firstName} {user.lastName}
      </div>
      <button
        className="px-3 py-1 text-sm active:px-2 active:py-0 transition-all duration-300 ease-out bg-black text-white rounded-[5px] ml-auto"
        onClick={() =>
          navigate("/send?id=" + user._id + "&name=" + user.firstName)
        }
      >
        Send
      </button>
    </div>
  );
};

export default User;
