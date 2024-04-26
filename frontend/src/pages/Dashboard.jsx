import React, { useEffect, useState } from "react";
import User from "../components/User";
import loader from "../assets/loader.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import { toast } from "sonner";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [balance, setBalance] = useState();
  const [popup, setPopup] = useState(false);
  const accountOwner = localStorage.getItem("firstName");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    axios
      .get("https://paytm-backend-6q0o.onrender.com")
      .then(() => {
        axios
          .get("https://paytm-backend-6q0o.onrender.com/api/v1/user/me", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            // console.log(res)
            localStorage.setItem("firstName", res.data.firstName);
            axios
              .get(
                "https://paytm-backend-6q0o.onrender.com/api/v1/account/balance",
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              )
              .then((res) => {
                console.log("balance fetched");
                setBalance(res.data.balance);
              })
              .catch((e) => toast.error(e.response.data.msg));
          })
          .catch((e) => {
            navigate("/signin");
            toast.error(e.response.data.msg);
          });
      })
      .catch((e) => {
        console.log(e);
        toast.error("Server is down!");
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://paytm-backend-6q0o.onrender.com")
      .then(() => {
        axios
          .get(
            "https://paytm-backend-6q0o.onrender.com/api/v1/user/bulk?filter=" +
              filter,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            // console.log(res);
            setUsers(res.data.user);
            setLoading(false);
          })
          .catch((e) => toast.error(e.response.data.msg));
      })
      .catch((e) => console.log("Server is down!"));
  }, [filter]);
  return (
    <div className="bg-white w-full flex flex-col gap-1 rounded py-2 px-4 h-full relative">
      {/* Popup */}
      {popup && (
        <Popup setPopup={setPopup}/>
      )}
      {/* header  */}
      <div className="border-b flex justify-between items-center py-2 relative">
        <div className="text-xl font-semibold">Paytm Bank</div>
        <div className="flex text-sm items-center gap-3">
          Hello, {accountOwner}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAyMjeDxqvJ0PjFclydxM5x19MqLb1JcSb4A&usqp=CAU"
            alt="profile"
            className="w-8 h-8 rounded-full"
            onClick={() => {
              setPopup(true);
            }}
          />
        </div>
      </div>

      {/* balance */}
      <div className="font-semibold mt-3 text-lg ">
        Balance: ₹
        <span className="border-b-grey border-b-2 border-dotted ml-1 p-0">
          {balance || "XXXX"}
        </span>
      </div>

      {/* show users */}
      <div className="flex flex-col gap-2 mt-6 overflow-y-auto rounded">
        <p className="text-lg font-semibold">Users</p>
        <input
          type="search"
          className="border rounded px-2 py-1"
          placeholder="Search Users..."
          onChange={(e) => setFilter(e.target.value)}
        />
        <span className="text-xs font-medium border-b-2 border-red-300 border-dotted self-start">Showing {users.length} results</span>
        <div className="overflow-y-auto min-h-[395px]">
          {loading ? (
            <>
            <img src={loader} alt="loading" className="mt-10 mx-auto" />
            <p className="text-sm text-center font-medium">connecting to server... (could take 25-30 seconds)</p>
            </>
          ) : (
            users.map((user) => <User user={user} key={user._id}></User>)
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
