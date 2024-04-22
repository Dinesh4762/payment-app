import React, { useEffect, useState } from "react";
import User from "../components/User";
import loader from "../assets/loader.svg";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [balance, setBalance] = useState();
  const accountOwner = localStorage.getItem("firstName");

  useEffect(()=>{
    const token = localStorage.getItem("token");
   axios
     .get("https://paytm-backend-6q0o.onrender.com/api/v1/account/balance", {
       headers: {
         Authorization: "Bearer " + token,
       },
     })
     .then((res) => {
       setBalance(res.data.balance);
     });
   console.log("balance fetched") 

},[])
  useEffect(() => {
    axios
      .get(
        "https://paytm-backend-6q0o.onrender.com/api/v1/user/bulk?filter=" +
          filter,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setUsers(res.data.user);
        setLoading(false);
      })

      .catch((e) => console.log(e));
  }, [filter]);
  return (
    <div className="bg-white w-full flex flex-col gap-1 rounded py-2 px-4 h-full relative">
      {/* header  */}
      <div className="border-b flex justify-between items-center py-2">
        <div className="text-xl font-semibold">Paytm Bank</div>
        <div className="flex text-base items-center gap-3">
          Hello,{accountOwner}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAyMjeDxqvJ0PjFclydxM5x19MqLb1JcSb4A&usqp=CAU"
            alt="profile"
            className="w-8 h-18 rounded-full"
          />
        </div>
      </div>

      {/* balance */}
      <div className="font-semibold mt-3 text-lg ">
        Balance: ₹
        <span className="border-b-grey border-b-2 border-dotted ml-1 p-0">
          {balance}
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
        <div className="overflow-y-auto min-h-[400px] mt-2">
          {loading ? (
            <img src={loader} alt="loading" className="my-10 mx-auto" />
          ) : (
            users.map((user) => <User user={user} key={user._id}></User>)
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
