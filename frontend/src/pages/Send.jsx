import axios from "axios";
import React, { useState } from "react";
import loader from '../assets/loader.svg'
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
const Send = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  return (
    <div
      className="w-full h-full bg-grey-500 bg-opacity-75 z-[10]"
      onClick={() => navigate("/dashboard")}
    >
      <div
        className="bg-white rounded px-4 py-3 flex flex-col gap-3 w-[325px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[300]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xl font-semibold self-center">Send Money</div>
        <div className="flex gap-2 items-center">
          <span className="w-8 h-8 rounded-full bg-green-500 grid place-content-center font-semibold text-white">{name[0].toUpperCase()}</span>
          <span>{name}</span>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <span className="text-xs font-medium">Amount (in Rs): </span>
          <input
            type="number"
            value={amount}
            pattern="[0-9]*"
            inputMode="numeric"
            className="border rounded px-2 py-1 font-medium"
            placeholder="Enter Amount"
            onChange={(e)=> setAmount(e.target.value)}
          />
        </div>
        <button
          className="bg-sky-500 hover:bg-sky-700 text-white rounded-[3px] text-xs px-3 py-2 font-medium mt-2"
          disabled={loading}
          onClick={() => {
            if(!amount){
              toast.error("Amount cannot be null!")
              return;
            }
            setLoading(true);
            axios
              .post(
                "https://paytm-backend-6q0o.onrender.com/api/v1/account/transfer",
                {
                  to: id,
                  amount,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )
              .then((res) => {
                if (res.data.success) {
                  setLoading(false);
                  setAmount("");
                  toast.success("payment done!");
                  setTimeout(() => {
                    navigate("/dashboard");
                  }, 1000);
                }
              })
              .catch((e) => {
                console.log(e)
                setLoading(false);
                toast.error(e.response.data.msg);
              });
          }}
        >{
          loading?(
            <img src={loader} alt="loading" className="mx-auto my-auto invert w-4 h-4"/>
          ):("Initiate Transfer")
        }
        </button>
      </div>
    </div>
  );
};

export default Send;
