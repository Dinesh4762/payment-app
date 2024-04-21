import React from "react";
import { useNavigate } from "react-router-dom";

const User = ({user}) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 items-center px-1 py-2">
      <div className="rounded-full overflow-hidden">
        <img
          src="data:image/jpeg;base64,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"
          alt="pfp"
          className="w-10 h-10"
        />
      </div>
      <div>
        {user.firstName} {user.lastName}
      </div>
      <button
        className="px-3 py-1 text-sm active:px-2 active:py-0 transition-all duration-300 ease-out bg-black text-white rounded-[5px] ml-auto"
        onClick={() => navigate("/send?id="+ user._id +"&name="+ user.firstName)}
      >
        Send
      </button>
    </div>
  );
};

export default User;
