import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import EditPopup from './EditPopup';
import { toast } from 'sonner';

const Popup = ({setPopup}) => {
    const navigate = useNavigate();
    const [editPopup, setEditPopup] = useState(false);
  return (
    // outer wrapper
    <div
      className="absolute inset-0 z-50 w-full h-full"
      onClick={() => setPopup(false)}
    >
      {/* popup menu */}
      <div
        className={`absolute ${
          editPopup ? "hidden" : "block"
        } z-[100] right-3 top-[50px] shadow-sm flex flex-col gap-0 rounded text-sm bg-[#f5f5f5] backdrop-filter backdrop-blur-lg bg-opacity-70`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="hover:bg-zinc-400/25 cursor-pointer px-4 py-2 border-b text-zinc-700 rounded"
          onClick={() => {
            setEditPopup(true);
          }}
        >
          Edit Profile
        </div>
        <div
          className="hover:bg-zinc-400/25 cursor-pointer px-4 py-2 text-zinc-700 rounded"
          onClick={() => {
            localStorage.removeItem("token");
            toast.success("Signed Out");
            navigate("/");
          }}
        >
          Sign Out
        </div>
      </div>
      {editPopup && <EditPopup setEditPopup={setEditPopup} />}
    </div>
  );
}

export default Popup
